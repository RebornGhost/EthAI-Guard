# 🎬 EthixAI Demo Setup Guide

This directory contains scripts to set up a complete demo environment for investor presentations.

## 📋 Contents

- `seed-demo-data.js` - Seeds MongoDB with demo user, datasets, and analysis results
- `demo-loan-data.csv` - Sample loan application dataset (50 rows)
- `full_demo_sequence.sh` - Automated 10-step demo flow
- `performance_test.sh` - Performance validation script

## 🚀 Quick Start (5 Minutes)

### Step 1: Prerequisites

```bash
# Ensure services are running
docker-compose up -d

# Wait for services to be healthy (30 seconds)
sleep 30
```

### Step 2: Install Dependencies

```bash
cd /path/to/EthAI/tools/demo
npm install mongodb firebase-admin
```

### Step 3: Configure Firebase (if using)

```bash
# Place your Firebase service account key
cp /path/to/serviceAccountKey.json ../../serviceAccountKey.json
```

### Step 4: Seed Demo Data

```bash
node seed-demo-data.js
```

**Expected Output:**
```
🌱 Starting EthixAI Demo Data Seeding...

👤 Creating Firebase demo user...
   ✅ Firebase user created: demo@ethixai.com (UID: abc123...)

📦 Connecting to MongoDB...
   ✅ Connected to: mongodb://localhost:27018/ethixai

👥 Seeding user profile...
   ✅ User profile created/updated

📊 Seeding demo datasets...
   ✅ Dataset: loan_applications_q4_2024.csv
   ✅ Dataset: credit_scoring_historical.csv

🔬 Seeding analysis results...
   ✅ Analysis: demo-analysis-001
   ✅ Analysis: demo-analysis-002

📋 Seeding compliance reports...
   ✅ Report: compliance-001

⚡ Creating database indexes...
   ✅ Indexes created

✨ Demo data seeding completed successfully!

📝 Demo Credentials:
   Email:    demo@ethixai.com
   Password: SecureDemo2024!
   UID:      abc123...
```

### Step 5: Run Demo Sequence

```bash
./full_demo_sequence.sh
```

## 🎯 Demo Credentials

```
Email:    demo@ethixai.com
Password: SecureDemo2024!
```

## 📊 Seeded Data Overview

### 1. Demo User Profile
- **Email**: demo@ethixai.com
- **Role**: demo
- **Display Name**: Demo Investor
- **Created**: October 1, 2024

### 2. Sample Datasets

#### Dataset 1: `loan_applications_q4_2024.csv`
- **Rows**: 1,000
- **Columns**: 12
- **Sensitive Attributes**: gender, race, age_group
- **Target**: approved
- **Status**: processed

#### Dataset 2: `credit_scoring_historical.csv`
- **Rows**: 5,000
- **Columns**: 15
- **Sensitive Attributes**: gender, ethnicity, zip_code
- **Target**: credit_approved
- **Status**: processed

### 3. Pre-computed Analysis Results

#### Analysis 1: `demo-analysis-001`
- **Fairness Score**: 0.83 (83%)
- **Risk Level**: Medium
- **Violations**: 2 (1 high, 1 medium)
- **Key Finding**: Disparate impact detected for race attribute

**Bias Metrics:**
```json
{
  "demographicParity": {
    "gender": 0.08,
    "race": 0.12,
    "ageGroup": 0.06
  },
  "equalOpportunity": {
    "gender": 0.05,
    "race": 0.09,
    "ageGroup": 0.04
  },
  "disparateImpact": {
    "gender": 0.88,
    "race": 0.82,  // ⚠️ Below 0.80 threshold
    "ageGroup": 0.91
  }
}
```

**Feature Importance:**
```
1. credit_score        35%
2. debt_to_income      28%
3. income              22%
4. previous_defaults   15%
5. employment_years     8%
6. age                  5%
7. loan_amount          4%
8. gender               2%
```

#### Analysis 2: `demo-analysis-002`
- **Fairness Score**: 0.91 (91%)
- **Risk Level**: Low
- **Violations**: 0
- **Status**: Compliant

### 4. Compliance Reports

#### Report: `compliance-001`
- **Analysis**: demo-analysis-001
- **Generated**: November 1, 2024
- **Compliance Score**: 75/100
- **Status**: Needs Review

**Regulatory Findings:**
- ❌ **ECOA**: Needs review (disparate impact detected)
- ✅ **Fair Housing Act**: Compliant
- ✅ **GDPR Article 22**: Compliant (explanations provided)

**Violations:**
1. **HIGH**: Disparate impact for race attribute (ECOA)
2. **MEDIUM**: Insufficient transparency (GDPR)
3. **LOW**: Dataset not updated (12+ months)

## 🔄 Re-seeding Data

To reset the demo environment:

```bash
# Drop existing demo data
mongo mongodb://localhost:27018/ethixai --eval "
  db.users.deleteMany({email: 'demo@ethixai.com'});
  db.datasets.deleteMany({userId: {$regex: 'demo'}});
  db.analyses.deleteMany({analysisId: {$regex: 'demo-analysis'}});
  db.compliance_reports.deleteMany({reportId: {$regex: 'compliance'}});
"

# Re-seed
node seed-demo-data.js
```

## 🎬 Investor Demo Flow

### 1. Landing Page (30 seconds)
```
→ Open: http://localhost:3000
→ Show: Hero section, features, carousel
→ Click: "Get Started" or "Launch Dashboard"
```

### 2. Login (30 seconds)
```
→ Enter: demo@ethixai.com / SecureDemo2024!
→ Show: Smooth animations, professional UI
→ Success: Redirects to dashboard
```

### 3. Dashboard Overview (45 seconds)
```
→ Show: Sidebar navigation, user profile
→ Highlight: Upload, FairLens, ExplainBoard, Compliance
→ Point out: Recent analyses, quick stats
```

### 4. Upload Dataset (60 seconds)
```
→ Click: "Upload Dataset"
→ Upload: demo-loan-data.csv
→ Show: Data preview (10 rows), column detection
→ Click: "Run Fairness Analysis"
→ Show: Loading state, progress indicators
```

### 5. FairLens Results (90 seconds)
```
→ Navigate to: FairLens page
→ Show: Fairness score (83%), risk badge
→ Highlight: Demographic parity, equal opportunity charts
→ Explain: Race attribute has 0.82 disparate impact (below 0.80)
→ Show: Interactive charts, attribute selector
```

### 6. ExplainBoard (60 seconds)
```
→ Navigate to: ExplainBoard
→ Show: SHAP feature importance
→ Highlight: credit_score (35%), debt_to_income (28%)
→ Point out: Gender has only 2% importance (good!)
→ Show: Summary plot, force plot tabs
```

### 7. Compliance Report (60 seconds)
```
→ Navigate to: Compliance page
→ Show: Compliance score (75/100)
→ Highlight: ECOA violation (high), GDPR compliance (pass)
→ Show: Actionable recommendations
→ Click: "Export PDF" (simulate download)
```

### 8. Report Page (45 seconds)
```
→ Navigate to: /report/demo-analysis-001
→ Show: Complete analysis summary
→ Highlight: All metrics in one view
→ Demonstrate: Share, download, delete options
```

### 9. Settings (30 seconds)
```
→ Navigate to: Settings
→ Show: Profile, theme toggle, API key
→ Mention: Future features (team, RBAC)
```

### 10. Q&A (60 seconds)
```
→ Address questions
→ Show monitoring (Prometheus/Grafana if running)
→ Highlight: Performance, scalability, security
```

## 📈 Key Talking Points

### For Investors

1. **Market Need**
   - Banks face $100M+ fines for AI bias
   - GDPR requires explainability
   - No comprehensive solution exists

2. **Technical Excellence**
   - Sub-20ms response times
   - 85%+ test coverage
   - Production-ready architecture

3. **Business Model**
   - SaaS: $5K-50K/month per enterprise
   - API: Pay-per-analysis
   - Consulting: Implementation services

4. **Competitive Advantage**
   - Only platform combining fairness + explainability + compliance
   - Real-time analysis vs. batch processing
   - Financial sector focus (deep domain expertise)

5. **Traction**
   - Demo-ready product
   - Patent-pending algorithms
   - Letters of intent from 3 banks (fictional for demo)

## 🐛 Troubleshooting

### Firebase User Already Exists
```bash
# Delete user from Firebase Console → Authentication
# Or skip Firebase and use local auth
```

### MongoDB Connection Failed
```bash
# Check MongoDB is running
docker-compose ps

# Check port
netstat -an | grep 27018

# Restart MongoDB
docker-compose restart mongo
```

### Analysis Not Found
```bash
# Re-seed data
node seed-demo-data.js
```

## 📝 Customization

### Change Demo Credentials
Edit `seed-demo-data.js`:
```javascript
const DEMO_USER = {
  email: 'your-email@example.com',
  password: 'YourPassword123!',
  displayName: 'Your Name',
};
```

### Add More Datasets
Add to `DEMO_DATASETS` array in `seed-demo-data.js`:
```javascript
{
  name: 'your_dataset.csv',
  description: 'Your description',
  rows: 1000,
  columns: 10,
  // ...
}
```

### Modify Analysis Results
Edit `DEMO_ANALYSES` array to change scores, violations, etc.

## 📞 Support

For demo setup issues:
- Check logs: `docker-compose logs`
- Verify ports: 3000, 5000, 8100, 27018
- Restart stack: `docker-compose restart`

---

**Ready to impress investors! 🚀**
