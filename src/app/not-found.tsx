import { ButtonLink, Actions } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="shell band" style={{ paddingTop: "8rem" }}>
      <h1 className="disp max-w-[14ch]" style={{ fontSize: "clamp(2.4rem,7vw,5.5rem)" }}>
        <span className="mask"><span>That page is not</span></span>
        <span className="mask"><span>on the loom.</span></span>
      </h1>
      <p className="lede fade mt-7">The link may be old or mistyped. The catalogue has every product we make.</p>
      <Actions className="fade mt-9">
        <ButtonLink href="/products" label="Go to the catalogue" variant="ind" cursor="Browse" />
        <ButtonLink href="/" label="Back to home" cursor="Home" />
      </Actions>
    </div>
  );
}
