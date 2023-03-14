import Editor from '@monaco-editor/react';
import { useDarkThemeStore } from '@states';

export function YamlCodeBlock(props: { code: string }) {
	const darkTheme = useDarkThemeStore((state) => state.dark);
	return <Editor height='45vh' language='yaml' defaultValue={props.code} theme={darkTheme ? 'vs-dark' : 'vs'} />;
}
