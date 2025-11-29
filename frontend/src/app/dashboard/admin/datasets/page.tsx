"use client";
import React, { useState } from "react";
import RoleProtected from "@/components/auth/RoleProtected";
import Breadcrumbs from '@/components/layout/breadcrumbs';
import PageHeader from '@/components/layout/page-header';
import api from '@/lib/api';

export default function AdminDatasetsPage() {
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<{ header: string[]; rows: string[][] } | null>(null);
  const [datasetId, setDatasetId] = useState<string | null>(null);
  const [versions, setVersions] = useState<Array<any>>([]);
  const [datasets, setDatasets] = useState<Array<any>>([]);
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !file) {
      setStatus('Please provide a dataset name and file');
      return;
    }
    setUploading(true);
    setStatus('Creating dataset record...');
    try {
      const create = await api.post('/datasets/upload', { name, type: file.name.split('.').pop() || 'csv' });
      const datasetId = create.data.datasetId;
      setDatasetId(datasetId);

      setStatus('Reading file...');
      const b64 = await new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve((r.result as string).split(',')[1]);
        r.onerror = reject;
        r.readAsDataURL(file);
      });

      setStatus('Requesting presign...');
      await api.post(`/datasets/${datasetId}/presign`);
      setStatus('Uploading content...');
      const ingest = await api.post(`/datasets/${datasetId}/ingest`, { filename: file.name, content_base64: b64 });
      setStatus('Ingest completed');
      setPreview({ header: ingest.data.header || [], rows: ingest.data.rows_preview || [] });

      // fetch versions for dataset
      try {
        const vres = await api.get(`/datasets/${datasetId}/versions`);
        setVersions(vres.data.versions || []);
      } catch (e) {
        console.warn('Failed to fetch versions', e);
      }
    } catch (err: any) {
      console.error('Upload error', err);
      setStatus(err?.response?.data?.error || 'upload_failed');
    } finally {
      setUploading(false);
    }
  }

  async function loadDatasets() {
    try {
      const res = await api.get('/datasets');
      setDatasets(res.data.datasets || []);
    } catch (e) {
      console.warn('Failed to load datasets', e);
    }
  }

  React.useEffect(() => { loadDatasets(); }, []);

  return (
    <RoleProtected required={["admin"]}>
      <div className="p-8 max-w-4xl mx-auto">
        <Breadcrumbs />
        <PageHeader title="Datasets (Admin)" subtitle="Upload, version, and manage datasets" />

        <div className="mt-6 rounded-lg border bg-white p-4">
          <h4 className="font-medium mb-3">Upload dataset (MVP)</h4>
          <form onSubmit={handleUpload} className="space-y-3">
            <div>
              <label className="block text-sm">Dataset name</label>
              <input value={name} onChange={e => setName(e.target.value)} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block text-sm">File (CSV)</label>
              <input type="file" accept=".csv,text/csv" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} />
            </div>
            <div>
              <button disabled={uploading} className="inline-flex items-center rounded-md bg-primary px-3 py-1 text-white">
                {uploading ? 'Uploading…' : 'Upload & Ingest'}
              </button>
            </div>
            {status && <div className="text-sm text-muted-foreground">{status}</div>}
          </form>

          {preview && (
            <div className="mt-4">
              <h5 className="font-medium">Preview</h5>
              <div className="overflow-auto mt-2">
                <table className="min-w-full text-sm table-auto border">
                  <thead className="bg-gray-50">
                    <tr>{preview.header.map(h => <th key={h} className="p-2 text-left">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {preview.rows.map((r, i) => (
                      <tr key={i} className="border-t">{r.map((c, j) => <td key={j} className="p-2">{c}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        
                  {datasetId && (
                    <div className="mt-6">
                      <h5 className="font-medium">Versions</h5>
                      {versions.length === 0 ? (
                        <div className="text-sm text-muted-foreground">No versions available</div>
                      ) : (
                        <div className="mt-2">
                          <table className="min-w-full text-sm table-auto border">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="p-2 text-left">Filename</th>
                                <th className="p-2 text-left">Rows</th>
                                <th className="p-2 text-left">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {versions.map((v: any) => (
                                <tr key={v.versionId} className="border-t">
                                  <td className="p-2">{v.filename}</td>
                                  <td className="p-2">{v.rows}</td>
                                  <td className="p-2">
                                    <button className="mr-2 text-sm text-primary" onClick={async () => {
                                      try {
                                        const meta = await api.get(`/datasets/${datasetId}/versions/${v.versionId}`);
                                        setPreview({ header: meta.data.version.header || [], rows: meta.data.version.rows_preview || [] });
                                      } catch (e) { console.error(e); }
                                    }}>Preview</button>
                                    <button className="mr-2 text-sm text-primary" onClick={async () => {
                                      try {
                                        const resp = await api.get(`/datasets/${datasetId}/versions/${v.versionId}/download`, { responseType: 'blob' });
                                        const url = window.URL.createObjectURL(new Blob([resp.data]));
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = v.filename || 'dataset.csv';
                                        document.body.appendChild(a);
                                        a.click();
                                        a.remove();
                                        window.URL.revokeObjectURL(url);
                                      } catch (e) { console.error('download failed', e); }
                                    }}>Download</button>
                                    <button className="text-sm text-red-600" onClick={async () => {
                                      if (!confirm('Delete this version?')) return;
                                      try {
                                        await api.delete(`/datasets/${datasetId}/versions/${v.versionId}`);
                                        // refresh versions
                                        const vres = await api.get(`/datasets/${datasetId}/versions`);
                                        setVersions(vres.data.versions || []);
                                      } catch (e) { console.error('delete failed', e); }
                                    }}>Delete</button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium mb-3">Datasets</h4>
                    {datasets.length === 0 ? (
                      <div className="text-sm text-muted-foreground">No datasets yet</div>
                    ) : (
                      <div className="overflow-auto">
                        <table className="min-w-full text-sm table-auto border">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="p-2 text-left">Name</th>
                              <th className="p-2 text-left">Versions</th>
                              <th className="p-2 text-left">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {datasets.map((ds: any) => (
                              <tr key={ds.datasetId} className="border-t">
                                <td className="p-2">{ds.name}</td>
                                <td className="p-2">{ds.versions}</td>
                                <td className="p-2">
                                  <button className="mr-2 text-sm text-primary" onClick={async () => {
                                    setSelectedDataset(ds.datasetId);
                                    setDatasetId(ds.datasetId);
                                    try {
                                      const vres = await api.get(`/datasets/${ds.datasetId}/versions`);
                                      setVersions(vres.data.versions || []);
                                    } catch (e) { console.error(e); }
                                  }}>View</button>
                                  <button className="text-sm text-red-600" onClick={async () => {
                                    if (!confirm('Delete dataset and all versions?')) return;
                                    try {
                                      await api.delete(`/datasets/${ds.datasetId}`);
                                      await loadDatasets();
                                      if (selectedDataset === ds.datasetId) {
                                        setSelectedDataset(null);
                                        setVersions([]);
                                        setPreview(null);
                                      }
                                    } catch (e) { console.error('delete failed', e); }
                                  }}>Delete</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
      </div>
    </RoleProtected>
  );
}
