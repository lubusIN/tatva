/**
 * Import variants only (no default component exports anymore)
 */
import { imageCompareVariants } from './ImageCompare';
import { markerVariants } from './Marker';
import { pulseVariants } from './Pulse';
import { textAnimationVariants } from './TextAnimation';

/**
 * Helper: build a wrapper component from a default variant meta,
 * and attach the full variants list into its meta.
 */
const buildDefaultComponent = (defaultMeta, variants) => {
    const Wrapped = (props) => defaultMeta.component?.(props);
    // carry over meta, but inject variants and ensure isDefault stays true for this wrapped one
    Wrapped.meta = {
        ...defaultMeta,
        isDefault: true,
        variants,
    };
    return Wrapped;
};

/**
 * Helper: pick default meta from a variants array (fallback to first)
 */
const pickDefaultMeta = (variants) =>
    variants.find(v => v?.isDefault) || variants[0];

/**
 * Return category defaults with variants attached
 */
export const getDefaultCategories = () => {
    const groups = [
        imageCompareVariants,
        markerVariants,
        pulseVariants,
        textAnimationVariants,
    ];

    return groups
        .map((variants) => {
            const defMeta = pickDefaultMeta(variants);
            if (!defMeta?.component) return null; // guard if misconfigured
            return buildDefaultComponent(defMeta, variants);
        })
        .filter(Boolean);
};
