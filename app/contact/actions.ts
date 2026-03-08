'use server'
import { createClient } from '@/lib/supabase/server'

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const inquiry_type = formData.get('inquiry_type') as string
  const message = formData.get('message') as string

  if (!name || name.length > 200) return { success: false, error: 'Name is required (max 200 chars)' }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { success: false, error: 'Valid email is required' }
  const validInquiryTypes = ['investor_inquiry', 'founder_application', 'impact_studio', 'partnership', 'general']
  if (!inquiry_type || !validInquiryTypes.includes(inquiry_type)) return { success: false, error: 'Invalid inquiry type' }
  if (!message || message.length > 5000) return { success: false, error: 'Message is required (max 5000 chars)' }

  const supabase = await createClient()
  const { error } = await supabase.from('contacts').insert({ name, email, phone: phone || null, inquiry_type, message })
  if (error) return { success: false, error: 'Failed to submit. Please try again.' }
  return { success: true }
}
