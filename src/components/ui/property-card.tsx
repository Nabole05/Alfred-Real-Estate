"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./glass-card";
import { Bed, Bath, Move, MapPin } from "lucide-react";

interface PropertyCardProps {
    title: string;
    price: string;
    location: string;
    beds: number;
    baths: number;
    sqft: number;
    image?: string;
    status?: string;
}

export function PropertyCard({
    title,
    price,
    location,
    beds,
    baths,
    sqft,
    image,
    status
}: PropertyCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <GlassCard className="group cursor-pointer">
                <div className="relative aspect-[16/10] overflow-hidden">
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-zinc-900 animate-pulse" />
                    )}

                    {status && (
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full">
                                {status}
                            </span>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                </div>

                <div className="p-6 space-y-4">
                    <div className="space-y-1">
                        <h3 className="text-xl font-semibold text-white group-hover:text-zinc-300 transition-colors">
                            {title}
                        </h3>
                        <div className="flex items-center gap-1 text-zinc-500 text-sm">
                            <MapPin size={14} />
                            <span>{location}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between py-4 border-y border-white/5">
                        <div className="flex items-center gap-2">
                            <Bed size={16} className="text-zinc-400" />
                            <span className="text-sm text-zinc-300">{beds} Dorms</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Bath size={16} className="text-zinc-400" />
                            <span className="text-sm text-zinc-300">{baths} Baños</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Move size={16} className="text-zinc-400" />
                            <span className="text-sm text-zinc-300">{sqft} m²</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <span className="text-2xl font-bold text-white">
                            {price}
                        </span>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest bg-white text-black rounded-lg"
                        >
                            Ver Detalle
                        </motion.button>
                    </div>
                </div>
            </GlassCard>
        </motion.div>
    );
}
