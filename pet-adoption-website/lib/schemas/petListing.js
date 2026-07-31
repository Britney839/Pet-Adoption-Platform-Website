import { z } from 'zod';

export const petListingSchema = z.object({
  title: z.string().describe('A catchy, adoption-ad-style title, e.g. "Meet Biscuit: Your New Couch Co-Pilot"'),
  description: z.string().describe('2-4 sentence warm, engaging description written for potential adopters'),
  personalityTraits: z.array(z.string()).describe('3-5 short personality traits, e.g. "Playful", "Cuddly", "Independent"'),
  idealHomeType: z.string().describe('Best living situation, e.g. "Apartment-friendly, low-energy household"'),
  goodWith: z.array(z.enum(['kids', 'dogs', 'cats', 'other_small_pets', 'first_time_owners'])),
  adoptionPitch: z.string().describe('One punchy sentence to hook a potential adopter'),
  category: z.enum(['Low-maintenance', 'Energetic', 'Senior-friendly', 'Special-needs', 'Great with kids']),
});