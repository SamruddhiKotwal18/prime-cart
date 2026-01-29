import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, CreditCard, Headphones } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import { categories, getFeaturedProducts } from "@/data/products";

const HomePage = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-gradient relative overflow-hidden">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-2xl relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-background/10 text-background text-sm font-medium mb-6 animate-fade-up">
                ✨ New Arrivals Just Dropped
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 font-display animate-fade-up stagger-1">
                Discover Premium Products for Every Lifestyle
              </h1>
              <p className="text-lg text-background/80 mb-8 max-w-lg animate-fade-up stagger-2">
                Shop the latest trends in electronics, fashion, home essentials, and more. Quality guaranteed, delivered to your doorstep.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-up stagger-3">
                <Link to="/category/electronics" className="btn-cta">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  to="/category/fashion"
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold bg-background/10 text-background backdrop-blur-sm hover:bg-background/20 transition-all"
                >
                  Browse Categories
                </Link>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-20">
              <div className="absolute right-20 top-10 w-72 h-72 rounded-full bg-background/30 blur-3xl" />
              <div className="absolute right-40 bottom-10 w-48 h-48 rounded-full bg-background/20 blur-2xl" />
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
                { icon: Shield, title: "Secure Payment", desc: "100% protected" },
                { icon: CreditCard, title: "Easy Returns", desc: "30-day guarantee" },
                { icon: Headphones, title: "24/7 Support", desc: "Here to help" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 md:gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-display mb-2">
                  Shop by Category
                </h2>
                <p className="text-muted-foreground">
                  Explore our curated collections
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold font-display mb-2">
                  Featured Products
                </h2>
                <p className="text-muted-foreground">
                  Handpicked favorites just for you
                </p>
              </div>
              <Link
                to="/category/electronics"
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                to="/category/electronics"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground font-display mb-4">
              Stay in the Loop
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
              Subscribe to get exclusive offers, new arrivals, and insider-only discounts.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg px-4 py-3 bg-background/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
              />
              <button
                type="submit"
                className="btn-cta shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
