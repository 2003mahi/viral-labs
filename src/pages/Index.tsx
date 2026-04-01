import { useState } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import GeneratorForm from "@/components/GeneratorForm";
import PostResult from "@/components/PostResult";
import LockedContent from "@/components/LockedContent";

interface GeneratedContent {
  post: string;
  carouselIdeas: string[];
  hashtags: string[];
  alternateHooks: string[];
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async (topic: string, tone: string) => {
    setIsLoading(true);
    setContent(null);
    setUnlocked(false);

    try {
      const { data, error } = await supabase.functions.invoke("generate-post", {
        body: { topic, tone },
      });

      if (error) throw error;
      setContent(data);
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error",
        description: err.message || "Failed to generate post. Try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlock = () => {
    // Cryptomus placeholder - redirect to checkout
    const merchantId = "YOUR_MERCHANT_ID";
    const checkoutUrl = `https://pay.cryptomus.com/pay?merchant=${merchantId}&amount=9.99&currency=USD&order_id=${Date.now()}`;
    
    toast({
      title: "Redirecting to Cryptomus",
      description: "You'll be redirected to complete the crypto payment.",
    });

    // For demo, unlock directly. In production, redirect & verify webhook.
    // window.open(checkoutUrl, "_blank");
    setUnlocked(true);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-12 md:py-20 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
            <Zap className="w-3 h-3 text-primary" />
            AI-Powered LinkedIn Growth
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
            <span className="text-gradient">ViralPost</span>{" "}
            <span className="text-foreground">AI</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Generate scroll-stopping LinkedIn posts in seconds. Powered by AI, designed for virality.
          </p>
        </motion.div>

        {/* Form */}
        <GeneratorForm onGenerate={handleGenerate} isLoading={isLoading} />

        {/* Results */}
        {content && (
          <div className="space-y-4">
            <PostResult post={content.post} />
            <LockedContent
              data={{
                carouselIdeas: content.carouselIdeas,
                hashtags: content.hashtags,
                alternateHooks: content.alternateHooks,
              }}
              unlocked={unlocked}
              onUnlock={handleUnlock}
            />
          </div>
        )}

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-muted-foreground pt-8"
        >
          Built with AI · Payments via Cryptomus
        </motion.p>
      </div>
    </div>
  );
};

export default Index;
