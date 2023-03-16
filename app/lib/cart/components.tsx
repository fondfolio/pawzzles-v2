import {
  CartLineInput,
  CartLineUpdateInput,
} from '@shopify/hydrogen/storefront-api-types';
import {Form} from '@remix-run/react';
import {CartAction} from './types';

interface Props<T> {
  children?: React.ReactNode;
  action: T;
  trigger: React.ReactNode;
  inputs: CartLineInput[];
}

type CartActionProps<T> = T extends 'LINES_ADD'
  ? {
      children?: React.ReactNode;
      action: T;
      trigger: React.ReactNode;
      inputs: CartLineInput[];
    }
  : T extends 'LINES_UPDATE'
  ? {
      children?: React.ReactNode;
      action: T;
      trigger: React.ReactNode;
      inputs: CartLineUpdateInput[];
    }
  : T extends 'LINES_REMOVE'
  ? {
      children?: React.ReactNode;
      action: T;
      trigger: React.ReactNode;
      inputs: {
        lineIds: string[];
      };
    }
  : never;

export function CartAction<T extends CartAction>({
  children,
  trigger,
  inputs,
  action,
}: CartActionProps<T>) {
  let fields: React.ReactNode[] | null = null;

  switch (action) {
    case 'LINES_UPDATE':
    case 'LINES_ADD':
      fields = inputs.map((line) => {
        return (
          <input
            key={line.merchandiseId}
            type="hidden"
            name="lines"
            value={JSON.stringify({
              line,
            })}
          />
        );
      });
      break;
    case 'LINES_REMOVE':
      fields = inputs.lineIds.map((line) => {
        return <input key={line} type="hidden" name="lineIds" value={line} />;
      });
      break;
  }

  return (
    <Form action="/cart" method="post">
      <input type="hidden" name="action" value={action} />
      {fields}
      {trigger}
      {children}
    </Form>
  );
}
