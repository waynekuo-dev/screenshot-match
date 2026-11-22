import { Link } from "react-router-dom";
import {
  ArrowRight,
  AudioLines,
  Check,
  Clock3,
  FileCheck2,
  Languages,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { PageMeta } from "@/components/PageMeta";
import { useAccount } from "@/components/account/SessionContext";
import studio from "@/assets/studio.asset.json";

const features = [
  {
    icon: AudioLines,
    title: "高準確度逐字稿",
    english: "High-accuracy transcripts",
    copy: "由 OpenAI Whisper 驅動，精準辨識中文與英文。讓每一句話，都完整留下。",
    tag: "Powered by OpenAI Whisper",
    tagIcon: Sparkles,
  },
  {
    icon: Zap,
    title: "三分鐘交付",
    english: "Three-minute turnaround",
    copy: "背景處理，不必守在螢幕前等待。逐字稿完成後，我們會以 Email 通知你。",
    tag: "Your time, back in your hands",
    tagIcon: Clock3,
  },
  {
    icon: ShieldCheck,
    title: "可商用授權",
    english: "Commercial-use ready",
    copy: "你擁有所有輸出內容。部落格、課程筆記或知識庫，隨心運用，放心商用。",
    tag: "Your content. Your ownership.",
    tagIcon: Check,
  },
];

export default function Landing() {
  const user = useAccount();
  return (
    <>
      <PageMeta
        title="Video Speed Reader — From Video to Words"
        description="上傳影片，三分鐘內拿到逐字稿。Upload your video, get a clean transcript in three minutes. Built for creators, educators, and engineers."
        ogDescription="Upload your video, get a clean transcript in three minutes."
      />
      <SiteHeader />
      <main>
        <section className="hero">
          <img
            className="hero-photo"
            src={studio.url}
            alt="A recording studio with a video editing laptop and broadcast microphone"
          />
          <div className="eyebrow fade-in">
            <span className="text-primary">
              <AudioLines size={14} />
            </span>
            FROM VIDEO TO WORDS
          </div>
          <h1 className="fade-in">Video Speed Reader</h1>
          <p className="hero-chinese fade-in">上傳影片，三分鐘內拿到逐字稿。</p>
          <p className="hero-subtitle fade-in">
            Upload your video, get a clean transcript in three minutes.
          </p>
          <Button size="lg" asChild className="hero-action fade-in">
            <Link to={user ? "/app" : "/sign-up"}>
              {user ? "Open your workspace" : "Get started / 開始使用"}
              <ArrowRight />
            </Link>
          </Button>
          <p className="hero-note">Less time transcribing. More time creating.</p>
          <div className="hero-bottom">
            <span>
              <Languages size={14} />
              中文 & English
            </span>
            <span>
              <Clock3 size={14} />
              3-minute turnaround
            </span>
            <span>
              <FileCheck2 size={14} />
              100% yours
            </span>
          </div>
        </section>
        <section className="features container-wide">
          <div className="section-heading">
            <div>
              <h2>讓你的內容，走得更遠。</h2>
              <p>Built for creators, educators, and engineers.</p>
            </div>
            <span className="eyebrow">LESS FRICTION. MORE POSSIBILITY.</span>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article key={feature.title} className="feature-card">
                <span className="feature-icon">
                  <feature.icon size={21} />
                </span>
                <h3>{feature.title}</h3>
                <div className="feature-en">{feature.english}</div>
                <p>{feature.copy}</p>
                <div className="feature-tag">
                  <feature.tagIcon size={12} />
                  {feature.tag}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
