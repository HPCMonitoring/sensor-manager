import { mockCodeYaml } from "@constants";
import Editor from "@monaco-editor/react";
import { useDarkThemeStore } from "@states";

export function YamlCodeBlock() {
  const darkTheme = useDarkThemeStore((state) => state.dark);
  return <Editor height='90vh' language='yaml' defaultValue={mockCodeYaml} theme={darkTheme ? "vs-dark" : "vs"} />;
}
