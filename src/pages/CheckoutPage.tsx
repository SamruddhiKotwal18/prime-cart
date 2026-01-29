import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Wallet, Banknote, ArrowRight, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

type PaymentMethod = "card" | "upi" | "cod";

interface FormData {
  fullName: string;
  address: string;
  city: string;
  pincode: string;
}

interface FormErrors {
  fullName?: string;
  address?: string;
  city?: string;
  pincode?: string;
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getSubtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const subtotal = getSubtotal();
  const shipping = subtotal > 4000 ? 0 : 199;
  const total = subtotal + shipping;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Please enter a complete address";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{5,6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = "Please enter a valid pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Make sure all fields are filled correctly.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();
    navigate("/order-confirmation", {
      state: {
        orderNumber: `SV${Date.now().toString().slice(-8)}`,
        total,
        paymentMethod,
      },
    });
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Cart
          </button>

          <h1 className="text-2xl md:text-3xl font-bold font-display mb-8">
            Checkout
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Forms */}
              <div className="lg:col-span-2 space-y-8">
                {/* Shipping Information */}
                <div className="rounded-xl bg-card border border-border p-6">
                  <h2 className="text-lg font-bold mb-6">Shipping Information</h2>

                  <div className="grid gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleInputChange("fullName")}
                        className={`input-styled ${errors.fullName ? "border-destructive" : ""}`}
                        placeholder="John Doe"
                      />
                      {errors.fullName && (
                        <p className="text-sm text-destructive mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium mb-2">
                        Address
                      </label>
                      <textarea
                        id="address"
                        value={formData.address}
                        onChange={handleInputChange("address")}
                        className={`input-styled resize-none h-24 ${errors.address ? "border-destructive" : ""}`}
                        placeholder="123 Main Street, Apartment 4B"
                      />
                      {errors.address && (
                        <p className="text-sm text-destructive mt-1">{errors.address}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium mb-2">
                          City
                        </label>
                        <input
                          id="city"
                          type="text"
                          value={formData.city}
                          onChange={handleInputChange("city")}
                          className={`input-styled ${errors.city ? "border-destructive" : ""}`}
                          placeholder="New York"
                        />
                        {errors.city && (
                          <p className="text-sm text-destructive mt-1">{errors.city}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="pincode" className="block text-sm font-medium mb-2">
                          Pincode
                        </label>
                        <input
                          id="pincode"
                          type="text"
                          value={formData.pincode}
                          onChange={handleInputChange("pincode")}
                          className={`input-styled ${errors.pincode ? "border-destructive" : ""}`}
                          placeholder="10001"
                        />
                        {errors.pincode && (
                          <p className="text-sm text-destructive mt-1">{errors.pincode}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="rounded-xl bg-card border border-border p-6">
                  <h2 className="text-lg font-bold mb-6">Payment Method</h2>

                  <div className="grid gap-3">
                    {[
                      { id: "card", label: "Credit / Debit Card", icon: CreditCard, desc: "Pay securely with your card" },
                      { id: "upi", label: "UPI", icon: Wallet, desc: "Pay using any UPI app" },
                      { id: "cod", label: "Cash on Delivery", icon: Banknote, desc: "Pay when you receive" },
                    ].map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          paymentMethod === method.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id as PaymentMethod)}
                          className="sr-only"
                        />
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          paymentMethod === method.id ? "bg-primary text-primary-foreground" : "bg-secondary"
                        }`}>
                          <method.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{method.label}</p>
                          <p className="text-sm text-muted-foreground">{method.desc}</p>
                        </div>
                        <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                          paymentMethod === method.id ? "border-primary" : "border-muted-foreground"
                        }`}>
                          {paymentMethod === method.id && (
                            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-xl bg-card border border-border p-6">
                  <h2 className="text-lg font-bold mb-4">Order Summary</h2>

                  {/* Items Preview */}
                  <div className="space-y-3 mb-4">
                    {items.slice(0, 3).map((item) => (
                      <div key={item.product.id} className="flex gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary/30 shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <span className="text-sm font-medium">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                    {items.length > 3 && (
                      <p className="text-sm text-muted-foreground">
                        +{items.length - 3} more items
                      </p>
                    )}
                  </div>

                  <div className="border-t border-border pt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? <span className="text-success">Free</span> : `₹${shipping.toLocaleString('en-IN')}`}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-border my-4" />

                  <div className="flex justify-between text-lg font-bold mb-6">
                    <span>Total</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="btn-cta w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Place Order
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
