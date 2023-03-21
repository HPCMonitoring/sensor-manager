import Editor from "@monaco-editor/react";
import { useConfigTopicSubscriptionModalStore, useDarkThemeStore } from "@states";

export function YamlCodeBlock(props: { turnOffTemplateUsage: () => void }) {
  const { topic, setScript } = useConfigTopicSubscriptionModalStore();
  const darkTheme = useDarkThemeStore((state) => state.dark);
  return (
    <Editor
      height='45vh'
      language='yaml'
      value={topic ? topic.script : ""}
      theme={darkTheme ? "vs-dark" : "vs"}
      onChange={(code) => {
        if (code) setScript(code);
        props.turnOffTemplateUsage();
      }}
    />
  );
}
