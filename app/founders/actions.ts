'use server'
import { createClient } from '@/lib/supabase/server'

export async function signUpStartup(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('full_name') as string
  const startupName = formData.get('startup_name') as string

  if (!fullName || fullName.trim().length < 2) {
    return { success: false, error: 'Please enter your full name.' }
  }
  if (!startupName || startupName.trim().length < 1) {
    return { success: false, error: 'Please enter your startup name.' }
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' }
  }
  if (!password || password.length < 8) {
    return { success: false, error: 'Password must be at least 8 characters.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, startup_name: startupName, role: 'founder' },
    },
  })
  if (error) return { success: false, error: error.message }
  return { success: true, message: 'Account created! Check your email to confirm, then submit your application.' }
}

export async function submitFounderApplication(formData: FormData) {
  const startup_name = formData.get('startup_name') as string
  const founder_name = formData.get('founder_name') as string
  const email = formData.get('email') as string
  const description = formData.get('description') as string
  const sector = formData.get('sector') as string
  const stage = formData.get('stage') as string

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
    status: 'pending',
  }).select('id').single()

  if (error) return { success: false, error: 'Failed to submit application. Please try again.' }
  return { success: true, applicationId: data.id }
}

export async function submitIntroductionRequest(formData: FormData) {
  const investor_name = formData.get('investor_name') as string
  const organization = formData.get('organization') as string
  const email = formData.get('inv_email') as string
  const deal_name = formData.get('deal_name') as string
  const ticket_size = formData.get('ticket_size') as string

  if (!investor_name) return { success: false, error: 'Investor name is required' }
  if (!organization) return { success: false, error: 'Organization is required' }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { success: false, error: 'Valid email is required' }
  if (!deal_name) return { success: false, error: 'Deal name is required' }
  if (!ticket_size) return { success: false, error: 'Intended ticket size is required' }

  const supabase = await createClient()
  const { error } = await supabase.from('introduction_requests').insert({
    investor_name,
    organization,
    email,
    deal_name,
    ticket_size,
    status: 'pending',
  })

  if (error) return { success: false, error: 'Failed to submit request. Please try again.' }
  return { success: true }
}
