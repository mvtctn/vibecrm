export type ContactStage =
    | 'lead'
    | 'qualified'
    | 'proposal'
    | 'negotiation'
    | 'won'
    | 'lost';

export type ChannelSource = 'email' | 'zalo' | 'telegram' | 'phone' | 'voice' | 'manual';

export type SentimentType = 'positive' | 'neutral' | 'cold' | 'urgent';

export type SuggestionType = 'follow_up' | 'quote' | 'call' | 'close' | 'check_in';

export interface Contact {
    id: string;
    name: string;
    phone: string;
    email: string;
    company: string;
    tags: string[];
    channel_source: ChannelSource;
    stage: ContactStage;
    sentiment: SentimentType;
    ai_summary: string;
    deal_value: number;
    deal_probability: number;
    avatar?: string;
    created_at: string;
    last_contact_at: string;
}

export interface Interaction {
    id: string;
    contact_id: string;
    contact_name: string;
    channel: ChannelSource;
    direction: 'inbound' | 'outbound';
    content: string;
    ai_extracted_intent?: string;
    ai_extracted_amount?: number;
    ai_extracted_date?: string;
    ai_extracted_product?: string;
    sentiment_score: number; // -1 to 1
    sentiment: SentimentType;
    ai_action?: string;
    stage_changed_to?: ContactStage;
    created_at: string;
}

export interface AISuggestion {
    id: string;
    contact_id: string;
    contact_name: string;
    type: SuggestionType;
    priority: 'high' | 'medium' | 'low';
    title: string;
    draft_message: string;
    status: 'pending' | 'done' | 'dismissed';
    scheduled_at: string;
    created_at: string;
}

export interface FollowUp {
    id: string;
    contact_id: string;
    contact_name: string;
    company: string;
    type: SuggestionType;
    due_date: string;
    note: string;
    draft_message: string;
    status: 'pending' | 'done' | 'snoozed';
    ai_created: boolean;
    channel: ChannelSource;
}

export interface AIActivityEvent {
    id: string;
    timestamp: string;
    type: 'new_lead' | 'stage_change' | 'follow_up_created' | 'message_processed' | 'deal_updated';
    contact_name: string;
    description: string;
    channel?: ChannelSource;
    icon: string;
}

export interface PipelineColumn {
    id: ContactStage;
    label: string;
    color: string;
    deals: PipelineDeal[];
}

export interface PipelineDeal {
    id: string;
    contact_id: string;
    contact_name: string;
    company: string;
    value: number;
    days_in_stage: number;
    last_activity: string;
    ai_confidence: number;
    ai_moved: boolean;
    stage: ContactStage;
    channel: ChannelSource;
}
