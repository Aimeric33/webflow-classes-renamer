import Eyebrow from "../ui/Eyebrow"
import Button from "../ui/Button"
import Image from "../ui/Image"
import heroImage from "../../assets/wcr_home_hero.webp";

export default function Hero() {
    return (
      <section className="pt-20">
        <Eyebrow dotColor="bg-white">Free tools for Webflow developers</Eyebrow>
        <div className="mb-4"></div>
        <h1>Rename Webflow classes in seconds. <br/>Paste. Rename. Copy back.</h1>
        <p className="max-w-lg">Paste any Webflow element, rename every class in one place, and copy it back to the Designer. No more clicking through the Style panel one class at a time.</p>
        <div className="mb-6"></div>
        <Button href="/renamer">Rename classes for free</Button>
        <div className="mb-3"></div>
        <Eyebrow>Always free · No account required</Eyebrow>
        <div className="mb-12"></div>
        <Image src={heroImage} alt="Example of Webflow classes renamed with this tool" ratio="2/1"></Image>
      </section>
    )
  }