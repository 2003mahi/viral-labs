import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface Props {
  post: string;
}

const PostResult = ({ post }: Props) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(post);
    setCopied(true);
    toast({ title: "Copied!", description: "Post copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 md:p-8 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-display font-semibold text-foreground">Your Viral Post</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="text-muted-foreground hover:text-foreground"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </Button>
      </div>
      <p className="text-foreground/90 leading-relaxed whitespace-pre-line text-sm md:text-base">
        {post}
      </p>
    </motion.div>
  );
};

export default PostResult;
