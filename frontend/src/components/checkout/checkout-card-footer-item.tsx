type FooterItemProps = {
  id: string;
  name: string;
  price: string;
};
export const CheckoutCardFooterItem: React.FC<{
  item: FooterItemProps;
  exchange: any;
  tax: number;
  total: number;
}> = ({
  item,
  exchange,
  tax,
  total: subtotal,
}: {
  item: FooterItemProps;
  exchange: any;
  tax: number;
  total: number;
}) => {
  const subtotalBss = subtotal * exchange?.price;
  const dollarTax = exchange?.price * tax;
  const total = subtotal + tax;
  if (!exchange)
    return (
      <div className="flex items-center w-full text-sm font-medium lg:pt-3 lg:pb-3 text-15px text-brand-dark last:border-b-0 last:text-base last:pb-0">
        cargando...
      </div>
    );

  return (
    <>
      <div className="flex items-center w-full text-sm font-medium lg:pt-3 lg:pb-3 text-15px text-brand-dark last:border-b-0 last:text-base last:pb-0">
        Subtotal
        <span className="font-normal ltr:ml-auto rtl:mr-auto shrink-0 text-15px text-brand-dark">
          BsS {subtotalBss.toFixed(2)}
        </span>
      </div>
      <div className="flex items-center w-full text-sm font-medium lg:pb-3 text-15px text-brand-dark last:border-b-0 last:text-base last:pb-0">
        IVA
        <span className="font-normal ltr:ml-auto rtl:mr-auto shrink-0 text-15px text-brand-dark">
          BsS {dollarTax.toFixed(2)}
        </span>
      </div>
      <div className="flex items-center w-full text-sm font-medium lg:pt-1 lg:pb-1 text-15px text-brand-dark last:border-b-0 last:text-base last:pb-0">
        total en $
        <span className="font-normal ltr:ml-auto rtl:mr-auto shrink-0 text-15px text-brand-dark">
          ${total.toFixed(2)}
        </span>
      </div>
      <div className="flex items-center w-full text-sm font-medium lg:pt-3 lg:pb-3 border-b border-border-base text-15px text-brand-dark last:border-b-0 last:text-base last:pb-0">
        Total en BsS
        <span className="font-normal ltr:ml-auto rtl:mr-auto shrink-0 text-15px text-brand-dark">
          BsS {(total * exchange?.price).toFixed(2)}
        </span>
      </div>
      <div className="flex items-center w-full py-4 text-sm font-medium border-b lg:py-5 border-border-base text-15px text-brand-dark last:border-b-0 last:text-base last:pb-0">
        Tasa de cambio
        <span className="font-normal ltr:ml-auto rtl:mr-auto shrink-0 text-15px text-brand-dark">
          {exchange?.price}
        </span>
      </div>
    </>
  );
};
