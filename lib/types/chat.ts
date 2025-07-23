export interface ChatResponse {
        response: string,
        metadata: {
            input_tokens: number,
            output_tokens: number,
            new_tokens: number,
            generation_time: number,
            tokens_per_second: number,
            model: string,
            parameters:  {
                temperature: number,
                max_length: number,
                top_p: number,
            }
    }
}
