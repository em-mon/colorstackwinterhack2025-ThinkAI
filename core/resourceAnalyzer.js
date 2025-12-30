export function resourceAnalyzer(prompt) {

// ??? asking to generate image/video costs more 
// ??? option to upload image or video using subscription
  // Tokenization estimation (rough approximation)
  const tokens = estimateTokens(prompt);
  
  // Calculate costs for different models
  const modelCosts = calculateModelCosts(tokens);
  
  // Calculate environmental impact
  const environmentalImpact = calculateEnvironmentalImpact(tokens, modelCosts);
  
  // Efficiency analysis
  const efficiency = analyzeEfficiency(prompt, tokens);
  
  return {
    tokens: {
      estimated: tokens,
      breakdown: getTokenBreakdown(prompt)
    },
    costs: modelCosts,
    environmental: environmentalImpact,
    efficiency: efficiency,
    recommendations: generateRecommendations(tokens, modelCosts, efficiency)
  };
}

// TOKENIZATION ESTIMATION
function estimateTokens(prompt) {
  // Rough estimation: ~4 characters per token on average
  // More accurate: count words, punctuation, special characters
  const words = prompt.split(/\s+/).length;
  const specialChars = (prompt.match(/[.,!?;:(){}[\]]/g) || []).length;
  const numbers = (prompt.match(/\d+/g) || []).length;
  
  // Each word ≈ 1.3 tokens, special chars = 1 token each, numbers vary
  const estimatedTokens = Math.ceil(
    (words * 1.3) + specialChars + (numbers * 0.5)
  );
  
  return estimatedTokens;
}

function getTokenBreakdown(prompt) {
  const words = prompt.split(/\s+/).filter(w => w.length > 0).length;
  const chars = prompt.length;
  const specialChars = (prompt.match(/[.,!?;:(){}[\]]/g) || []).length;
  const numbers = (prompt.match(/\d+/g) || []).length;
  
  return {
    words,
    characters: chars,
    specialCharacters: specialChars,
    numbers
  };
}

// COST CALCULATION
function calculateModelCosts(tokens) {
  // Pricing per 1M tokens (as of 2024/2025 - approximate)
  const pricingInput = {
    'Claude Opus 4': { input: 15.00, output: 75.00 },
    'Claude Sonnet 4': { input: 3.00, output: 15.00 },
    'Claude Haiku 4': { input: 0.25, output: 1.25 },
    'GPT-4': { input: 30.00, output: 60.00 },
    'GPT-4 Turbo': { input: 10.00, output: 30.00 },
    'GPT-3.5 Turbo': { input: 0.50, output: 1.50 }
  };
  
  // Assume output is 2x input tokens (average response)
  const outputTokens = tokens * 2;
  
  const costs = {};
  Object.keys(pricingInput).forEach(model => {
    const inputCost = (tokens / 1_000_000) * pricingInput[model].input;
    const outputCost = (outputTokens / 1_000_000) * pricingInput[model].output;
    const totalCost = inputCost + outputCost;
    
    costs[model] = {
      inputCost: inputCost.toFixed(6),
      outputCost: outputCost.toFixed(6),
      totalCost: totalCost.toFixed(6),
      costPer1k: ((totalCost / tokens) * 1000).toFixed(4)
    };
  });
  
  return costs;
}

// ENVIRONMENTAL IMPACT CALCULATION
function calculateEnvironmentalImpact(tokens, modelCosts) {
  // Estimates based on research:
  // - Average ML inference: ~0.002-0.02 kWh per 1000 tokens
  // - CO2: ~0.5 kg per kWh (US average grid)
  // - Water: ~1.8L per kWh (for cooling data centers)
  
  const outputTokens = tokens * 2;
  const totalTokens = tokens + outputTokens;
  
  // Energy consumption (kWh)
  const energyPerModel = {
    'Claude Opus 4': 0.015, // Higher for larger models
    'Claude Sonnet 4': 0.008,
    'Claude Haiku 4': 0.003,
    'GPT-4': 0.018,
    'GPT-4 Turbo': 0.010,
    'GPT-3.5 Turbo': 0.004
  };
  
  const environmental = {};
  Object.keys(energyPerModel).forEach(model => {
    const energyKwh = (totalTokens / 1000) * energyPerModel[model];
    const co2Grams = energyKwh * 500; // 500g CO2 per kWh
    const waterLiters = energyKwh * 1.8;
    
    environmental[model] = {
      energy: energyKwh.toFixed(4) + ' kWh',
      co2: co2Grams.toFixed(2) + ' g',
      water: waterLiters.toFixed(2) + ' L',
      equivalent: getEquivalent(co2Grams)
    };
  });
  
  return environmental;
}

function getEquivalent(co2Grams) {
  // Provide relatable equivalents
  if (co2Grams < 10) {
    return 'Similar to charging a smartphone';
  } else if (co2Grams < 50) {
    return 'Similar to boiling water for tea';
  } else if (co2Grams < 200) {
    return 'Similar to driving 1 km in a car';
  } else {
    return 'Similar to ' + (co2Grams / 200).toFixed(1) + ' km of driving';
  }
}

// EFFICIENCY ANALYSIS
function analyzeEfficiency(prompt, tokens) {
  const efficiency = {
    score: 5,
    issues: [],
    strengths: []
  };
  
  // Check token efficiency (information density)
  const words = prompt.split(/\s+/).length;
  const tokensPerWord = tokens / words;
  
  if (tokensPerWord < 1.5) {
    efficiency.strengths.push('High information density - efficient use of tokens');
    efficiency.score += 2;
  } else if (tokensPerWord > 2.0) {
    efficiency.issues.push('Low information density - consider more concise phrasing');
    efficiency.score -= 1;
  }
  
  // Check for repetition
  const wordArray = prompt.toLowerCase().split(/\s+/);
  const uniqueWords = new Set(wordArray);
  const repetitionRatio = uniqueWords.size / wordArray.length;
  
  if (repetitionRatio > 0.7) {
    efficiency.strengths.push('Minimal repetition - good token economy');
    efficiency.score += 1;
  } else if (repetitionRatio < 0.5) {
    efficiency.issues.push('High repetition - removing duplicates could save tokens');
    efficiency.score -= 2;
  }
  
  // Check for unnecessary filler words
  const fillerWords = ['basically', 'actually', 'literally', 'really', 'very', 'just', 'maybe', 'perhaps'];
  const foundFillers = fillerWords.filter(filler => 
    prompt.toLowerCase().includes(filler)
  );
  
  if (foundFillers.length === 0) {
    efficiency.strengths.push('No filler words - direct communication');
    efficiency.score += 1;
  } else {
    efficiency.issues.push(`Contains filler words: ${foundFillers.join(', ')}`);
    efficiency.score -= 1;
  }
  
  // Check prompt length efficiency
  if (tokens < 50) {
    efficiency.strengths.push('Concise prompt - low resource usage');
    efficiency.score += 1;
  } else if (tokens > 200) {
    efficiency.issues.push('Long prompt - consider breaking into multiple queries');
    efficiency.score -= 1;
  }
  
  return {
    score: Math.max(0, Math.min(10, efficiency.score)),
    issues: efficiency.issues,
    strengths: efficiency.strengths
  };
}

// RECOMMENDATIONS
function generateRecommendations(tokens, modelCosts, efficiency) {
  const recommendations = [];
  
  // Model recommendations based on complexity
  if (tokens < 50) {
    recommendations.push({
      type: 'model',
      message: 'For simple prompts, use Claude Haiku or GPT-3.5 Turbo for cost efficiency'
    });
  } else if (tokens < 150) {
    recommendations.push({
      type: 'model',
      message: 'Claude Sonnet 4 or GPT-4 Turbo offer good balance of capability and cost'
    });
  } else {
    recommendations.push({
      type: 'model',
      message: 'Complex prompt - may benefit from Claude Opus or GPT-4, but consider splitting'
    });
  }
  
  // Cost savings recommendations
  const haikuCost = parseFloat(modelCosts['Claude Haiku 4'].totalCost);
  const opusCost = parseFloat(modelCosts['Claude Opus 4'].totalCost);
  const savings = ((opusCost - haikuCost) / opusCost * 100).toFixed(0);
  
  recommendations.push({
    type: 'cost',
    message: `Using Claude Haiku instead of Opus could save ${savings}% on costs`
  });
  
  // Environmental recommendations
  if (tokens > 100) {
    recommendations.push({
      type: 'environmental',
      message: 'Consider caching or reusing responses to reduce environmental impact'
    });
  }
  
  // Efficiency recommendations
  if (efficiency.score < 6) {
    recommendations.push({
      type: 'efficiency',
      message: 'Optimize your prompt to reduce token usage and environmental impact'
    });
  }
  
  return recommendations;
}