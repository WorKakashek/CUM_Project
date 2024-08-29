import * as React from "react";

interface Props {
  orderId: number;
  totalAmount: number;
  paymentLink: string;
}

export const PayOrderTemplate: React.FC<Props> = ({
  orderId,
  totalAmount,
  paymentLink,
}) => (
  <div>
    <h1>Order - #{orderId}</h1>
    <p>
      To pay ${totalAmount} go to <a href={paymentLink}>payment page</a>
    </p>
  </div>
);
