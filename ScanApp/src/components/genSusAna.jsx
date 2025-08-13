import { GoogleGenAI } from "@google/genai";
import { supabase } from "../lib/supabase.js";

const ai = new GoogleGenAI({ apiKey: "AIzaSyDcWAxigJxR6fCuZvcTUHSWS2lI37NJwJQ" });

/**
 * Generates a sustainability score and description for a brand
 * @param {string} brandName 
 * @returns {Promise<Object>}
 */

async function updateSustainabilityIndex(userId, newScore) {
    try {
      // Step 1: Get current index and scan count
      const { data, error: fetchError } = await supabase
        .from('profiles') // adjust table name if needed
        .select('sustainability_index, total_scans')
        .eq('id', userId)
        .single();
  
      if (fetchError) throw fetchError;
  
      const currentIndex = data.sustainability_index || 0;
      const currentScans = data.total_scans || 0;
      const parsedScore = parseInt(newScore, 10);
  
      // Step 2: Calculate new index
      const newIndex = ((currentIndex * currentScans) + parsedScore) / (currentScans + 1);
      const roundedIndex = Math.round(newIndex * 100) / 100; // optional: round to 2 decimal places
  
      // Step 3: Update DB
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          sustainability_index: roundedIndex,
          total_scans: currentScans + 1
        })
        .eq('id', userId);
  
      if (updateError) throw updateError;
  
      console.log('Sustainability index updated successfully.');
    } catch (error) {
      console.error('Error updating sustainability index:', error);
    }
  }

async function genSusAna(brandName, user) {
  try {
    const prompt = `
      Please generate a sustainability analysis for the brand ${brandName}.
      Give three key things the brand is doing to improve the environment, and three key things it is doing that
      is bad for the environment. Don't give headers.
      Please put your answer in dot jots, remove all styling. No bolding or italics. 
    `;
    const prompt2 = `
      Please generate a sustainability score for the brand ${brandName} out of 10.
      Include specific sustainability initiatives, areas for improvement, and any environmental challenges the brand is facing.
      Give me only a integer out of 10.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
      });
    
    let description = response.text

    const response2 = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt2,
      });
    
    let score = response2.text
    score = score.substring(score.indexOf('\\'));

    await updateSustainabilityIndex(user, score);
    console.log(user, score);

    if (brandName == "Unknown") {
        score = "N/A";
        description = "N/A";
    }

    return {
        score: score, 
        description: description
    };

  } catch (error) {
    console.error('Error generating sustainability analysis:', error);
    return {
      score: 'N/A',
      description: 'Analysis could not be generated.',
    };
  }
}

/**
 * Fetches URLs related to sustainability efforts of the brand.
 * @param {string} query 
 * @returns {Promise<Array>}
 */

export { genSusAna };