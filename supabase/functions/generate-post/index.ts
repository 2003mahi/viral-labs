import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { topic, tone } = await req.json();
    if (!topic || !tone) {
      return new Response(JSON.stringify({ error: "Topic and tone are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are a viral LinkedIn content strategist. Generate content in the following JSON format exactly:
{
  "post": "the main linkedin post (120-180 words, viral style with line breaks and emojis)",
  "carouselIdeas": ["idea1", "idea2", "idea3", "idea4", "idea5"],
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5", "#tag6", "#tag7", "#tag8", "#tag9", "#tag10"],
  "alternateHooks": ["hook1", "hook2", "hook3"]
}
Make the post extremely engaging with a strong hook, storytelling elements, and a call to action. Use the specified tone.`
          },
          {
            role: "user",
            content: `Generate a viral LinkedIn post about: "${topic}". Tone: ${tone}. Return ONLY valid JSON.`
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "generate_linkedin_content",
              description: "Generate viral LinkedIn content",
              parameters: {
                type: "object",
                properties: {
                  post: { type: "string", description: "Main LinkedIn post 120-180 words" },
                  carouselIdeas: { type: "array", items: { type: "string" }, description: "5 carousel slide ideas" },
                  hashtags: { type: "array", items: { type: "string" }, description: "10 relevant hashtags" },
                  alternateHooks: { type: "array", items: { type: "string" }, description: "3 alternate opening hooks" },
                },
                required: ["post", "carouselIdeas", "hashtags", "alternateHooks"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "generate_linkedin_content" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again in a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call in response");

    const content = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(content), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
