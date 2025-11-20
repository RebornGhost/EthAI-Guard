import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ArrowRight, CheckCircle, BarChart, FileJson, ShieldCheck, Github, BookOpen, FileText } from 'lucide-react';
import { Footer } from '@/components/layout/footer';
import { Logo } from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: <BarChart className="w-8 h-8 text-primary" />,
    title: 'Fairness Analysis',
    description: 'Detect and mitigate bias with 3 key metrics: Demographic Parity, Equal Opportunity, and Disparate Impact. Get instant fairness scores and actionable insights.',
    metrics: ['Demographic Parity ≤ 0.10', 'Equal Opportunity ≤ 0.10', 'Disparate Impact ≥ 0.80'],
  },
  {
    icon: <FileJson className="w-8 h-8 text-primary" />,
    title: 'Explainability',
    description: 'Understand model predictions with SHAP analysis. Visualize feature importance, force plots, and dependence plots for complete transparency.',
    metrics: ['SHAP Values', 'Feature Importance', 'Force Plots'],
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: 'Compliance Reporting',
    description: 'Ensure your AI systems adhere to ECOA, GDPR, and FCRA regulations. Generate audit-ready reports with compliance scores and violation alerts.',
    metrics: ['ECOA Compliance', 'GDPR Ready', 'FCRA Aligned'],
  },
];

const carouselFeatures = [
  {
    id: PlaceHolderImages[0]?.id || '1',
    title: 'FairLens',
    description: 'Analyze disparate impact, statistical parity, and equal opportunity with interactive charts.',
    image: PlaceHolderImages[0]?.imageUrl || 'https://picsum.photos/seed/fairlens/600/400',
    imageHint: PlaceHolderImages[0]?.imageHint || 'data visualization',
  },
  {
    id: PlaceHolderImages[1]?.id || '2',
    title: 'ExplainBoard',
    description: 'Generate SHAP summary plots, force plots, and dependence plots to demystify your model\'s behavior.',
    image: PlaceHolderImages[1]?.imageUrl || 'https://picsum.photos/seed/explainboard/600/400',
    imageHint: PlaceHolderImages[1]?.imageHint || 'abstract graph',
  },
  {
    id: PlaceHolderImages[2]?.id || '3',
    title: 'Compliance Reports',
    description: 'Automatically generate audit-ready reports with compliance scores and actionable recommendations.',
    image: PlaceHolderImages[2]?.imageUrl || 'https://picsum.photos/seed/compliance/600/400',
    imageHint: PlaceHolderImages[2]?.imageHint || 'document paper',
  },
];

const frameworkLogos = [
  { name: 'SHAP', logo: <span className="text-2xl font-bold">SHAP</span> },
  { name: 'AIF360', logo: <span className="text-2xl font-bold">AIF360</span> },
  { name: 'Scikit-learn', logo: <span className="text-2xl font-bold">Scikit-learn</span> },
  { name: 'TensorFlow', logo: <span className="text-2xl font-bold">TensorFlow</span> },
  { name: 'PyTorch', logo: <span className="text-2xl font-bold">PyTorch</span> },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="#features" className="transition-colors hover:text-foreground/80 text-foreground/60">Features</Link>
            <Link href="/docs" className="transition-colors hover:text-foreground/80 text-foreground/60">Docs</Link>
          </nav>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20"
          >
            <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
            <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
          </div>
          <div className="container relative z-10 text-center">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 mb-6 text-sm font-medium bg-card/50 backdrop-blur-sm">
              <span className="mr-2">🎉</span>
              <span>Now with real-time bias detection</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 animate-fade-in-up">
              Trustworthy AI starts with<br />
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                measurable fairness
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
              EthixAI is an <span className="font-semibold text-foreground">open-source</span> ethics and explainability engine for financial institutions, 
              ensuring your AI models are <span className="font-semibold text-foreground">fair</span>, <span className="font-semibold text-foreground">transparent</span>, and <span className="font-semibold text-foreground">compliant</span>.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button size="lg" asChild className="text-lg px-8">
                <Link href="/dashboard">
                  Start Free Analysis <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8">
                <Link href="/login">
                  View Demo
                </Link>
              </Button>
            </div>
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
              <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                <div className="text-3xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground mt-1">Accuracy</div>
              </div>
              <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                <div className="text-3xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground mt-1">Compliance Standards</div>
              </div>
              <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                <div className="text-3xl font-bold text-primary">&lt;2s</div>
                <div className="text-sm text-muted-foreground mt-1">Analysis Time</div>
              </div>
              <div className="bg-card/30 backdrop-blur-sm rounded-lg p-4 border border-border/50">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground mt-1">Open Source</div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="features" className="py-20 bg-card/20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Built for Responsible AI</h2>
              <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                A comprehensive toolkit to navigate the complexities of AI ethics in finance.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center bg-card shadow-md hover:shadow-xl hover:shadow-primary/10 transition-all group">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 p-3 rounded-lg w-fit group-hover:bg-primary/20 transition-colors">
                      {feature.icon}
                    </div>
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-left">
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <div className="space-y-2">
                      {feature.metrics.map((metric, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Carousel */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Powerful Features, Simplified</h2>
              <p className="max-w-2xl mx-auto mt-4 text-muted-foreground">
                From bias detection to regulatory reporting, all in one platform.
              </p>
            </div>
            <Carousel className="w-full max-w-4xl mx-auto" opts={{ loop: true }}>
              <CarouselContent>
                {carouselFeatures.map((feature) => (
                  <CarouselItem key={feature.id}>
                    <div className="p-1">
                      <Card className="overflow-hidden">
                        <div className="grid md:grid-cols-2 items-center">
                          <div className="p-8">
                            <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                          </div>
                          <div className="bg-muted h-64 md:h-full flex items-center justify-center">
                            <Image
                              src={feature.image}
                              alt={feature.title}
                              width={600}
                              height={400}
                              data-ai-hint={feature.imageHint}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-[-50px]" />
              <CarouselNext className="right-[-50px]" />
            </Carousel>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Why Choose EthixAI?
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Real-Time Analysis</h3>
                      <p className="text-muted-foreground">
                        Get instant fairness scores and bias detection in under 2 seconds. Upload your CSV and receive comprehensive analysis immediately.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Production-Ready</h3>
                      <p className="text-muted-foreground">
                        Built with MongoDB Atlas, Docker, and microservices architecture. Scale from prototype to production seamlessly.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Open Source & Transparent</h3>
                      <p className="text-muted-foreground">
                        100% open source with MIT license. No black boxes, no vendor lock-in. Full transparency in how fairness is measured.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Financial Industry Focused</h3>
                      <p className="text-muted-foreground">
                        Designed specifically for loan approvals, credit scoring, and financial decision-making. ECOA and FCRA compliant out of the box.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl p-8 backdrop-blur-sm border border-primary/20">
                  <div className="space-y-4">
                    <div className="bg-card rounded-lg p-4 shadow-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Overall Fairness Score</span>
                        <span className="text-2xl font-bold text-green-500">83%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '83%' }} />
                      </div>
                    </div>
                    <div className="bg-card rounded-lg p-4 shadow-lg">
                      <div className="text-sm font-medium mb-3">Bias Metrics</div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Demographic Parity</span>
                          <span className="font-mono text-green-600">0.08 ✓</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Equal Opportunity</span>
                          <span className="font-mono text-green-600">0.05 ✓</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Disparate Impact</span>
                          <span className="font-mono text-yellow-600">0.82 ⚠</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-card rounded-lg p-4 shadow-lg">
                      <div className="text-sm font-medium mb-2">Feature Importance</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground w-24">credit_score</span>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: '35%' }} />
                          </div>
                          <span className="text-xs font-mono">35%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground w-24">debt_ratio</span>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: '28%' }} />
                          </div>
                          <span className="text-xs font-mono">28%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground w-24">income</span>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: '22%' }} />
                          </div>
                          <span className="text-xs font-mono">22%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Frameworks Section */}
        <section className="py-20 bg-card/20">
          <div className="container">
            <h2 className="text-center text-2xl font-bold mb-4">
              Built on Industry Standards
            </h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Integrating best-in-class tools for fairness, explainability, and machine learning
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
              {frameworkLogos.map((fw) => (
                <div key={fw.name} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  {fw.logo}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-purple-600 p-12 text-center text-white shadow-2xl">
              <div className="absolute inset-0 bg-grid-white/10" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Build Trustworthy AI?
                </h2>
                <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                  Join financial institutions using EthixAI to ensure their AI models are fair, explainable, and compliant.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button size="lg" variant="secondary" asChild className="text-lg px-8">
                    <Link href="/dashboard">
                      Start Free Analysis <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="text-lg px-8 bg-white/10 text-white border-white/20 hover:bg-white/20">
                    <Link href="/docs">
                      <BookOpen className="mr-2 h-5 w-5" />
                      View Documentation
                    </Link>
                  </Button>
                </div>
                <div className="mt-8 text-sm text-white/80">
                  No credit card required • Open source • MIT License
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
