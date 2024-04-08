import { Box, Tag, TagProps, Tooltip } from "@chakra-ui/react";
import React, { ReactNode } from "react";
type CustomedToolTipProps = {
  children: ReactNode;
  label: string;
} & TagProps;
const CustomedToolTip = React.forwardRef<HTMLDivElement, CustomedToolTipProps>(
  ({ children, label, ...rest }, ref) => (
    <Box>
      <Tag bg="transparent" ref={ref} {...rest}>
        <Tooltip label={label}>{children}</Tooltip>
      </Tag>
    </Box>
  )
);

export default CustomedToolTip;
