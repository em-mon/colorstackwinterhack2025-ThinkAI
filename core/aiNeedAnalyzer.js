export function aiNeedAnalyzer(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  
  // Patterns that DON'T need AI
  const noAIPatterns = [
    /what is \d+ \+ \d+/,           // Simple math
    /how do i spell/,               // Dictionary lookup
    /what time is it/,              // System time
    /convert \d+ (pounds|kg|miles)/ // Unit conversion
  ];
  
  // Patterns that DO need AI
  const needsAIPatterns = [
    /write (a|an|me)/,              // Content generation
    /explain|analyze|summarize/,    // Understanding tasks
    /create|generate|design/,       // Creative tasks
    /help me (understand|with)/,    // Complex assistance
  ];
  
  // Check no-AI patterns
  for (let pattern of noAIPatterns) {
    if (pattern.test(lowerPrompt)) {
      return {
        needsAI: false,
        confidence: 'high',
        reason: 'This can be solved with a simple tool or lookup',
        alternatives: ['Calculator', 'Dictionary', 'Search Engine']
      };
    }
  }
  
  // Check needs-AI patterns
  for (let pattern of needsAIPatterns) {
    if (pattern.test(lowerPrompt)) {
      return {
        needsAI: true,
        confidence: 'high',
        reason: 'This requires understanding, reasoning, or generation',
        recommendedModels: getModelRecommendations(prompt)
      };
    }
  }
  
  // probably needs AI if uncertain
  return {
    needsAI: true,
    confidence: 'medium',
    reason: 'Complex query that may benefit from AI',
    recommendedModels: ['Claude Sonnet', 'GPT-4']
  };
}

function getModelRecommendations(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('code') || lowerPrompt.includes('program')) {
    return ['Claude Sonnet 4', 'GPT-4', 'Codex'];
  }
  if (lowerPrompt.includes('image') || lowerPrompt.includes('picture')) {
    return ['DALL-E', 'Midjourney', 'Stable Diffusion'];
  }
  if (lowerPrompt.length < 50) {
    return ['Claude Haiku', 'GPT-3.5']; // Fast models for simple queries
  }
  return ['Claude Sonnet 4', 'GPT-4']; // Default to capable models
}