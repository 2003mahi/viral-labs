import { Lock, Zap, Hash, MessageSquare, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ContentData {
  carouselIdeas: string[];
  hashtags: string[];
  alternateHooks: string[];
}

interface Props {
  data: ContentData;
  unlocked: boolean;
  onUnlock: () => void;
}

const LockedContent = ({ data, unlocked, onUnlock }: Props) => {
  if (!unlocked) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-6 md:p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/90 z-10" />
        <div className="space-y-6 blur-sm select-none" aria-hidden>
          <Section icon={<LayoutGrid className="w-4 h-4" />} title="5 Carousel Ideas" items={["Loading...", "Loading...", "Loading..."]} />
          <Section icon={<Hash className="w-4 h-4" />} title="10 Hashtags" items={["#loading", "#loading", "#loading"]} />
          <Section icon={<MessageSquare className="w-4 h-4" />} title="3 Alternate Hooks" items={["Loading...", "Loading..."]} />
        </div>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4">
          <Lock className="w-8 h-8 text-accent animate-pulse-glow" />
          <p className="text-foreground font-display font-semibold text-lg text-center">Premium Content Locked</p>
          <Button
            onClick={onUnlock}
            className="bg-accent text-accent-foreground hover:bg-accent/90 glow-accent font-semibold px-6"
          >
            <Zap className="w-4 h-4 mr-2" />
            Unlock Full Content with Crypto
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="glass rounded-2xl p-6 md:p-8 space-y-6">
        <Section icon={<LayoutGrid className="w-4 h-4 text-primary" />} title="Carousel Ideas" items={data.carouselIdeas} numbered />
        <Section icon={<Hash className="w-4 h-4 text-primary" />} title="Hashtags" items={data.hashtags} inline />
        <Section icon={<MessageSquare className="w-4 h-4 text-primary" />} title="Alternate Hooks" items={data.alternateHooks} numbered />
      </div>
    </motion.div>
  );
};

const Section = ({ icon, title, items, numbered, inline }: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  numbered?: boolean;
  inline?: boolean;
}) => (
  <div className="space-y-3">
    <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground font-display">
      {icon} {title}
    </h3>
    {inline ? (
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span key={i} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
            {item}
          </span>
        ))}
      </div>
    ) : (
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-muted-foreground">
            {numbered ? `${i + 1}. ` : "• "}{item}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default LockedContent;
