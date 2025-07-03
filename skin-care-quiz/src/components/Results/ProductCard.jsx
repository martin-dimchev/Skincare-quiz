import { useState, useEffect } from 'react';
import './ProductCard.css';

function ProductCard({ product }) {
    const productId = product.id.toString();
    const getInitialWishlist = () => {
        const stored = localStorage.getItem('wishlist') || '[]';
        const wishlistArray = JSON.parse(stored);
        return wishlistArray.includes(productId);
    };

    const [wishlisted, setWishlisted] = useState(getInitialWishlist);

    useEffect(() => {

        const stored = localStorage.getItem('wishlist') || '[]';
        let wishlistArray = JSON.parse(stored);

        if (wishlisted) {
            if (!wishlistArray.includes(productId)) {
                wishlistArray.push(productId);
            }
        } else {
            wishlistArray = wishlistArray.filter(id => id !== productId);
        }
        localStorage.setItem('wishlist', JSON.stringify(wishlistArray));
    }, [wishlisted, productId]);

    const image = product.images && product.images.length > 0 ? product.images[0].src : null;
    const price = product.variants && product.variants.length > 0 ? product.variants[0].price : '0.00';

    const toggleWishlist = (e) => {
        e.stopPropagation();
        setWishlisted(!wishlisted);
    };

    return (
        <div className="product-card">
            <div className="product-image-container">
                {image ? (
                    <img
                        src={image}
                        alt={product.title}
                        className="product-image"
                    />
                ) : (
                    <div className="no-image">No Image</div>
                )}
                <div
                    className={`heart-icon ${wishlisted ? 'wishlisted' : ''}`}
                    onClick={toggleWishlist}
                    role="button"
                    aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && toggleWishlist(e)}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill={wishlisted ? 'red' : 'none'} xmlns="http://www.w3.org/2000/svg" stroke={wishlisted ? 'red' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </div>
            </div>
            <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">${price}</p>
            </div>
        </div>
    );
}

export default ProductCard;
