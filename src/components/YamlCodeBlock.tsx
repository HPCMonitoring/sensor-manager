import Editor from "@monaco-editor/react";
import { useConfigSensorTopicModalStore, useDarkThemeStore } from "@states";

export function YamlCodeBlock() {
  const { topic, setScript } = useConfigSensorTopicModalStore();
  const darkTheme = useDarkThemeStore((state) => state.dark);
  return (
    <Editor
      height='45vh'
      language='yaml'
      value={topic ? topic.script : ""}
      theme={darkTheme ? "vs-dark" : "vs"}
      onChange={(code) => code && setScript(code)}
    />
  );
}
