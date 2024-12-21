export interface Database {
  public: {
    Tables: {
      messages: {
        Row: {
          id: string
          content: string
          user_id: string
          created_at: string
        }
        Insert: {
          content: string
          user_id: string
          created_at?: string
        }
      }
    }
  }
}