import { Search, Cpu, Database, Languages, PlayCircle, Terminal, GitCommit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10">
      {/* --- HERO SECTION --- */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-16 text-center">
          <Badge variant="secondary" className="mb-4">v2.5-flash Powered</Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl mb-6">
            Chat with your <span className="text-primary">YouTube Library</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto mb-8">
            A high-performance RAG pipeline for extracting, translating, and querying knowledge 
            from educational YouTube content using FastAPI, Qdrant, and Gemini.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline"> <GitCommit className="mr-2 h-4 w-4" /> View Source</Button>
          </div>
        </div>
      </header>

      {/* --- TECH STACK BADGES --- */}
      <div className="border-b bg-muted/40">
        <div className="container mx-auto px-4 py-4 flex flex-wrap justify-center gap-3">
          {["Python 3.14", "FastAPI", "Next.js", "Qdrant", "SentenceTransformers", "Gemini 2.5"].map((tech) => (
            <Badge key={tech} variant="outline" className="bg-background">{tech}</Badge>
          ))}
        </div>
      </div>

      {/* --- SOURCE MATERIAL --- */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">Curated Source Material</h2>
            <p className="text-muted-foreground mb-6">
              Built on world-class educational content from creators like 3Blue1Brown, 
              CampusX, and CodeWithHarry. Supporting both English and Hindi natively through advanced translation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[ "Neural Networks", "Transformers", "Deep Learning", "Machine Learning"].map((topic) => (
                <div key={topic} className="flex items-center gap-2">
                  <PlayCircle className="h-5 w-5 text-primary" />
                  <span className="font-medium">{topic}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
             <div className="h-32 bg-secondary rounded-xl flex items-center justify-center font-bold">3Blue1Brown</div>
             <div className="h-32 bg-primary/10 rounded-xl flex items-center justify-center font-bold">CampusX</div>
             <div className="h-32 bg-primary/10 rounded-xl flex items-center justify-center font-bold">CodeWithHarry</div>
             <div className="h-32 bg-secondary rounded-xl flex items-center justify-center font-bold">Tutorials</div>
          </div>
        </div>
      </section>

      {/* --- METHODOLOGY / FEATURES --- */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">The RAG Pipeline</h2>
          <div className="grid md:grid-cols-3 gap-8">
            
            <Card>
              <CardHeader>
                <Languages className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Cross-Lingual Support</CardTitle>
                <CardDescription>
                  Uses Google Deep Translate to normalize Hindi transcripts into English for unified semantic retrieval.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Cpu className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Smart Chunking</CardTitle>
                <CardDescription>
                  200-word sliding windows ensure semantic coherence and high precision during vector search.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Database className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Qdrant Vector DB</CardTitle>
                <CardDescription>
                  High-speed similarity search with all-MiniLM-L6-v2 embeddings and detailed metadata payloads.
                </CardDescription>
              </CardHeader>
            </Card>

          </div>
        </div>
      </section>

      {/* --- DEPLOYMENT --- */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-950 text-slate-50 rounded-2xl p-8 shadow-2xl overflow-hidden relative">
            <Terminal className="absolute top-4 right-4 text-slate-800 h-24 w-24" />
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Terminal className="h-6 w-6" /> Self-Host in Seconds
            </h2>
            <p className="text-slate-400 mb-6">
              Run the entire stack (FastAPI + Redis + Qdrant) locally using Docker Compose.
            </p>
            <div className="bg-black/50 rounded-lg p-4 font-mono text-sm border border-slate-800">
              <p className="text-emerald-400"># Clone and Start</p>
              <p>git clone https://github.com/user/rag-youtube-chatapp</p>
              <p>cd rag-pipeline && docker compose up --build</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 RAG-Youtube-Chatapp. Built with Gemini & Shadcn.</p>
        </div>
      </footer>
    </div>
  );
}