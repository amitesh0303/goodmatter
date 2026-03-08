'use server'
import { createClient } from '@/lib/supabase/server'

export async function requestIntroduction(dealId: string, message: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Authentication required' }

  const { data: existing } = await supabase
    .from('introduction_requests')
    .select('id')
    .eq('deal_id', dealId)
    .eq('investor_id', user.id)
    .single()

  if (existing) return { success: false, error: 'You have already requested an introduction for this deal' }

  const { error } = await supabase.from('introduction_requests').insert({
    deal_id: dealId,
    investor_id: user.id,
    message: message || null,
  })

  if (error) return { success: false, error: 'Failed to submit request' }
  return { success: true }
}
