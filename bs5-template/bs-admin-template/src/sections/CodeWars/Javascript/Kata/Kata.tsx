import * as React from 'react';
import { Typography, Link as MuiLink } from '@mui/material';
import { styled } from '@mui/material/styles';

interface BoxProps extends React.PropsWithChildren {
  className?: string;
}

const Box = styled(({ className, children }: BoxProps) => {
  return <div className={className}>{children}</div>;
})(() => ({
  background: '#ececee',
}));

const Code = styled(({ className, children }: BoxProps) => {
  return (
    <pre className={className}>
      <code>{children}</code>
    </pre>
  );
})(() => ({
  background: '#fdfdfd',
}));

const Kata: React.FunctionComponent = () => {
  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Sum of Digits / Digital Root
      </Typography>

      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Description
        </Typography>

        <Typography paragraph>
          <MuiLink href="https://en.wikipedia.org/wiki/Digital_root">
            Digital root
          </MuiLink>{' '}
          is the recursive sum of all the digits in a number.
        </Typography>

        <Typography paragraph>
          Given n, take the sum of the digits of n. If that value has more than
          one digit, continue reducing in this way until a single-digit number
          is produced. The input will be a non-negative integer.
        </Typography>

        <Typography variant="h6" sx={{ mb: 2 }}>
          Examples
        </Typography>

        <Code sx={{ px: 3, py: 2, borderRadius: '.375rem' }}>
          &nbsp;&nbsp;&nbsp;&nbsp;16 --&gt; 1 + 6 = 7 <br />
          &nbsp;&nbsp;&nbsp;942 --&gt; 9 + 4 + 2 = 15 --&gt; 1 + 5 = 6 <br />
          132189 --&gt; 1 + 3 + 2 + 1 + 8 + 9 = 24 --&gt; 2 + 4 = 6 <br />
          493193 --&gt; 4 + 9 + 3 + 1 + 9 + 3 = 29 --&gt; 2 + 9 = 11 --&gt; 1 +
          1 = 2
        </Code>
      </Box>
    </>
  );
};

export default Kata;
