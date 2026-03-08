'use server'
import { createClient } from '@/lib/supabase/server'

export async function submitFounderApplication(formData: FormData) {
  const startup_name = formData.get('startup_name') as string
  const founder_name = formData.get('founder_name') as string
  const email = formData.get('email') as string
  const description = formData.get('description') as string
  const sector = formData.get('sector') as string
  const stage = formData.get('stage') as string
  const raise_amount = formData.get('raise_amount') as string

  if (!startup_name) return { success: false, error: 'Startup name is required' }
  if (!founder_name) return { success: false, error: 'Founder name is required' }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { success: false, error: 'Valid email is required' }
  if (!description) return { success: false, error: 'Description is required' }

  const supabase = await createClient()
  const { data, error } = await supabase.from('founder_applications').insert({
    startup_name,
    founder_name,
    email,
    description,
    sector: sector || null,
    stage: stage || null,
    raise_amount: raise_amount || null,
    status: 'pending',
  }).select('id').single()

  if (error) return { success: false, error: 'Failed to submit application. Please try again.' }
  return { success: true, applicationId: data.id }
}
