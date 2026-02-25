import { Card } from "@/components/ui/card";

import type { ReactElement, ReactNode } from "react";

type SimulationLayoutProps = {
  canvas: ReactNode;
  controls: ReactNode;
  metrics: ReactNode;
  statusMessages?: ReactNode;
};

const SimulationLayout = ({
  canvas,
  controls,
  metrics,
  statusMessages,
}: SimulationLayoutProps): ReactElement => {
  return (
    <Card className="mt-10 w-full border border-border bg-card shadow-none">
      <div className="flex flex-col gap-6 p-6 lg:flex-row">
        {/* Canvas Section */}
        <div className="flex-1">{canvas}</div>

        {/* Controls and Metrics Section */}
        <div className="flex w-full flex-col gap-6 lg:w-80">
          {/* Controls */}
          {controls}

          {/* Metrics */}
          <div className="flex flex-col gap-4 text-sm text-muted-foreground">{metrics}</div>

          {/* Error/Status Messages */}
          {statusMessages && <div className="text-xs text-muted-foreground">{statusMessages}</div>}
        </div>
      </div>
    </Card>
  );
};

export default SimulationLayout;
