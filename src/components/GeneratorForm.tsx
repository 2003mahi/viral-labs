import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

const tones = ["Professional", "Friendly", "Storytelling", "Motivational", "Bold"];

interface Props {
  onGenerate: (topic: string, tone: string) => void;
  isLoading: boolean;
}

const GeneratorForm = ({ onGenerate, isLoading }: Props) => {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onGenerate(topic, tone);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass rounded-2xl p-6 md:p-8 space-y-5"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Topic</label>
        <Input
          placeholder="e.g. How AI is transforming remote work..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="bg-secondary border-border text-foreground placeholder:text-muted-foreground h-12 text-base"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Tone</label>
        <Select value={tone} onValueChange={setTone}>
          <SelectTrigger className="bg-secondary border-border text-foreground h-12 text-base">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            {tones.map((t) => (
              <SelectItem key={t} value={t} className="text-foreground">
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        disabled={isLoading || !topic.trim()}
        className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 glow-primary transition-all duration-300"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
            Generating...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Generate Post
          </span>
        )}
      </Button>
    </motion.form>
  );
};

export default GeneratorForm;
