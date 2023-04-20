import Editor from '@monaco-editor/react';
import { useKafkaJobConfigModalStore, useDarkThemeStore, useFilterTemplateStore } from '@states';
import { useMemo } from 'react';

export function YamlCodeBlock(props: { turnOffTemplateUsage: () => void }) {
  const { job, setScript } = useKafkaJobConfigModalStore();
  const darkTheme = useDarkThemeStore((state) => state.dark);

  const filterTemplates = useFilterTemplateStore((state) => state.filterTemplates);
  const currTemplate = useMemo(() => {
    if (!job) return null;
    if (job.usingTemplate === null) return null;
    const template = filterTemplates.find((item) => item.id === job.usingTemplate?.id);
    return !template ? null : template;
  }, [filterTemplates, job]);

  return (
    <Editor
      height='45vh'
      language='yaml'
      value={job ? job.script : ''}
      theme={darkTheme ? 'vs-dark' : 'vs'}
      onChange={(code) => {
        if (code) setScript(code);
        if (currTemplate && currTemplate.script !== code) props.turnOffTemplateUsage();
      }}
    />
  );
}
