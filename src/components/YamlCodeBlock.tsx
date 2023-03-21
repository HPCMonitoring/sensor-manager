import Editor from "@monaco-editor/react";
import {
  useConfigTopicSubscriptionModalStore,
  useDarkThemeStore,
  useFilterTemplateStore
} from "@states";
import { useMemo } from "react";

export function YamlCodeBlock(props: { turnOffTemplateUsage: () => void }) {
  const { topic, setScript } = useConfigTopicSubscriptionModalStore();
  const darkTheme = useDarkThemeStore((state) => state.dark);

  const filterTemplates = useFilterTemplateStore((state) => state.filterTemplates);
  const currTemplate = useMemo(() => {
    if (!topic) return null;
    if (topic.usingTemplate === null) return null;
    const template = filterTemplates.find((item) => item.id === topic.usingTemplate?.id);
    return !template ? null : template;
  }, [filterTemplates, topic]);

  return (
    <Editor
      height='45vh'
      language='yaml'
      value={topic ? topic.script : ""}
      theme={darkTheme ? "vs-dark" : "vs"}
      onChange={(code) => {
        if (code) setScript(code);
        if (currTemplate && currTemplate.script !== code) props.turnOffTemplateUsage();
      }}
    />
  );
}
