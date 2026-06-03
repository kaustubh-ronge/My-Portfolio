'use client';

import {
    Code,
    CodeBlock,
    CodeHeader,
} from '@/components/animate-ui/components/animate/code';
import { Code2, File } from 'lucide-react';

export const CodeDemo = ({
    duration,
    delay,
    writing,
    cursor,
}) => {
    return (
        <Code
            key={`${duration}-${delay}-${writing}-${cursor}`}
            className="w-full sm:w-110 h-120 border-none"
            code={`import { useState } from "react";
import { toast } from "sonner";

const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
};

export default useFetch;
`}
        >
            <CodeHeader icon={Code2} copyButton>
                use-fetch.jsx
            </CodeHeader>

            <CodeBlock
                cursor={cursor}
                lang="jsx"
                writing={writing}
                duration={duration}
                delay={delay}
            />
        </Code>
    );
};