import Eyebrow from "../ui/Eyebrow"
import Button from "../ui/Button"

export default function Hero() {
    return (
      <section className="pt-30">
        <Eyebrow>Free tool for Webflow developers</Eyebrow>
        <h1>Rename Webflow classes in seconds. <br/>Paste. Rename. Copy back.</h1>
        <p className="max-w-lg">Paste any Webflow element, rename every class in one place, and copy it back to the Designer. No more clicking through the Style panel one class at a time.</p>
        <div className="mb-6"></div>
        <Button>Rename classes for free</Button>
      </section>
    )
  }