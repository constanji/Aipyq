import { OpenAIStream, StreamingTextResponse } from 'ai';
import { Configuration, OpenAIApi } from 'openai-edge';
import { createClient } from '@supabase/supabase-js';
import GPT3Tokenizer from 'gpt3-tokenizer';
// import { Langfuse } from "langfuse";  // Langfuse import removed

export const config = {
  runtime: 'edge',
};

const openAIconfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(openAIconfig);
const supabaseClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    db: { schema: 'docs' },
    auth: {
      persistSession: false,
    },
  }
);

// const langfuse = new Langfuse({ ... });  // Langfuse initialization removed

export default async function handler(req: Request, res: Response) {
  const body = await req.json();

  // const trace = langfuse.trace({ ... });  // Langfuse tracing initialization removed

  const messages = body.messages;

  // Exclude additional fields from being sent to OpenAI
  const openAiMessageHistory = messages.map(({ content, role }) => ({
    content,
    role: role,
  }));

  // get last message
  const sanitizedQuery = messages[messages.length - 1].content.trim();

  // trace.update({ ... });  // Langfuse trace update removed

  // const retrievalSpan = trace.span({ ... });  // Langfuse span for retrieval removed

  // const embeddingSpan = retrievalSpan.generation({ ... });  // Langfuse generation for embedding removed

  const embeddingResponse = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input: sanitizedQuery.replaceAll('\n', ' '),
  });
  if (embeddingResponse.status !== 200) {
    // embeddingSpan.update({ ... });  // Langfuse span update for error removed
    console.error('Failed to create embedding for question', embeddingResponse);
    throw new Error('Failed to create embedding for question');
  }
  const [{ embedding }] = (await embeddingResponse.json()).data;
  // embeddingSpan.end();  // Langfuse span end removed

  // const vectorStoreSpan = retrievalSpan.span({ ... });  // Langfuse span for vector store removed

  const { error: matchError, data: pageSections } = await supabaseClient.rpc(
    'match_page_sections',
    {
      embedding,
      match_threshold: 0.78,
      match_count: 10,
      min_content_length: 50,
    }
  );

  if (matchError) {
    // vectorStoreSpan.update({ ... });  // Langfuse span update for error removed
    console.error('Failed to match page sections', matchError);
    throw new Error('Failed to match page sections');
  }

  // vectorStoreSpan.end({ ... });  // Langfuse span end removed

  // const contextEncodingSpan = retrievalSpan.span({ ... });  // Langfuse span for context encoding removed

  const tokenizer = new GPT3Tokenizer({ type: 'gpt3' });
  let tokenCount = 0;
  let contextText = '';

  for (const pageSection of pageSections) {
    const content = pageSection.content;
    const encoded = tokenizer.encode(content);
    tokenCount += encoded.text.length;

    if (tokenCount >= 1500) {
      break;
    }

    contextText += `${content.trim()}\n---\n`;
  }

  // contextEncodingSpan.end({ ... });  // Langfuse span end removed
  // retrievalSpan.end({ ... });  // Langfuse span end removed

  const promptName =
    contextText !== ''
      ? 'qa-answer-with-context-chat'
      : 'qa-answer-no-context-chat';

  // const promptSpan = trace.span({ ... });  // Langfuse span for prompt fetching removed
  // const langfusePrompt = await langfuse.getPrompt(promptName, undefined, { type: "chat" });  // Langfuse prompt fetching removed
  // const compiledLangfuseMessages = langfusePrompt.compile({ ... });  // Langfuse prompt compilation removed
  // promptSpan.end({ ... });  // Langfuse span end removed

  const assembledMessages = [
    // ...compiledLangfuseMessages,  // Langfuse compiled messages removed
    ...openAiMessageHistory,
  ];

  // const generation = trace.generation({ ... });  // Langfuse generation trace removed

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: assembledMessages,
  });
  const stream = OpenAIStream(response, {
    onStart: () => {
      // generation.update({ ... });  // Langfuse generation update removed
    },
    onCompletion: async (completion) => {
      // generation.end({ ... });  // Langfuse generation end removed
      // trace.update({ ... });  // Langfuse trace update removed
      // await langfuse.shutdownAsync();  // Langfuse shutdown removed
    },
  });
  return new StreamingTextResponse(stream, {
    headers: {
      // "X-Trace-Id": trace.id,  // Langfuse trace ID header removed
    },
  });
}
