import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Package, Home, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

interface LocationState {
  orderNumber: string;
  total: number;
  paymentMethod: string;
}

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  useEffect(() => {
    if (!state?.orderNumber) {
      navigate("/");
      return;
    }

    // Trigger confetti celebration
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#2D7D7B", "#F17A5D", "#FFD93D", "#6BCB77"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#2D7D7B", "#F17A5D", "#FFD93D", "#6BCB77"],
      });
    }, 250);

    return () => clearInterval(interval);
  }, [state, navigate]);

  if (!state?.orderNumber) {
    return null;
  }

  const paymentMethodLabel = {
    card: "Credit / Debit Card",
    upi: "UPI",
    cod: "Cash on Delivery",
  }[state.paymentMethod] || state.paymentMethod;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-lg text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-success/20 animate-ping" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-success">
              <CheckCircle className="h-12 w-12 text-success-foreground" />
            </div>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
          Order Placed Successfully!
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Thank you for shopping with ShopVerse. Your order is being processed.
        </p>

        {/* Order Details Card */}
        <div className="rounded-xl bg-card border border-border p-6 mb-8 text-left">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="font-bold text-lg">{state.orderNumber}</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Order Total</span>
              <span className="font-bold text-lg">${state.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium">{paymentMethodLabel}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Estimated Delivery</span>
              <span className="font-medium">3-5 Business Days</span>
            </div>
          </div>
        </div>

        {/* Info Text */}
        <p className="text-sm text-muted-foreground mb-8">
          A confirmation email has been sent to your registered email address with the order details.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-cta">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <Link
            to="/category/electronics"
            className="btn-primary"
          >
            Continue Shopping
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
