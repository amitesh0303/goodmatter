'use server'
import { createClient } from '@/lib/supabase/server'

export async function signInFounder(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { success: false, error: error.message }
  return { success: true }
}

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
