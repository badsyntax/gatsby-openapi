import Typography from 'typography';
import funstonTheme from 'typography-theme-bootstrap';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const typography = new Typography({
  funstonTheme,
});

export const { scale, rhythm, options } = typography;
export default typography;
