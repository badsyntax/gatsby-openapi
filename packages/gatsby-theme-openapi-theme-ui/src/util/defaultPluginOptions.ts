import { CustomPluginOptions } from '../types';

export const defaultPluginOptions = ({
  generateCodeSamples,
  codeSampleTargets,
  singlePage,
  ...rest
}: CustomPluginOptions): Required<CustomPluginOptions> => {
  return {
    ...rest,
    generateCodeSamples: generateCodeSamples ?? true,
    codeSampleTargets: codeSampleTargets ?? [
      'shell_curl',
      'python_python3',
      'php_curl',
    ],
    singlePage: singlePage ?? false,
  };
};
