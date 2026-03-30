"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

// Fix for default marker icon issues in Leaflet + Next.js
const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
    center: [number, number];
    rankings: Array<{
        id: string;
        lat: number;
        lng: number;
        suitabilityScore: number;
        successScore?: number;
        successProbability?: number;
        expectedRevenue?: number;
        confidenceLevel?: string;
        rank?: number;
    }>;
    heatmapData: Array<{
        lat: number;
        lng: number;
        intensity: number;
    }>;
    startIndex?: number;
    selectedId?: string;
}

export default function MapVisualization({ center, rankings, heatmapData, startIndex = 0, selectedId }: MapProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const tileLayerRef = useRef<L.TileLayer | null>(null);
    const markersRef = useRef<{ [key: string]: L.Marker }>({});
    const [isFullscreen, setIsFullscreen] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        if (mapInstanceRef.current) {
            setTimeout(() => {
                mapInstanceRef.current?.invalidateSize();
            }, 300);
        }
    }, [isFullscreen]);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        if (!mapInstanceRef.current) {
            mapInstanceRef.current = L.map(mapContainerRef.current).setView(center, 12);
        }
        
        const map = mapInstanceRef.current;

        // Clear existing layers (except tiles)
        map.eachLayer((layer) => {
            if (layer instanceof L.Marker || layer instanceof L.CircleMarker || (layer as any)._heat) {
                map.removeLayer(layer);
            }
        });
        markersRef.current = {};

        // 1. Add Heatmap Layer
        if (heatmapData.length > 0) {
            const heatPoints = heatmapData.map((p) => [
                p.lat, 
                p.lng, 
                Math.min(1.0, p.intensity * 1.5) // Boost slightly for visibility, but cap at 1.0
            ]);

            (L as any).heatLayer(heatPoints, {
                radius: 18,
                blur: 15,
                maxZoom: 13,
                max: 1.0,
                gradient: {
                    0.3: "blue",
                    0.5: "lime",
                    0.7: "yellow",
                    1.0: "red",
                },
            }).addTo(map);
        }

        // 2. Add Markers for Rankings
        rankings.forEach((site, index) => {
            const globalRank = startIndex + index + 1;
            const marker = L.marker([site.lat, site.lng], {
                title: `Rank #${globalRank} (Score: ${site.successScore || site.suitabilityScore})`,
                zIndexOffset: 1000 - index,
            })
                .bindPopup(`
        <div style="font-family: sans-serif; min-width: 160px; padding: 4px;">
            <strong style="color: #2563eb; font-size: 15px;">Rank #${globalRank}</strong>
            <div style="font-size: 13px; margin-top: 6px; color: #374151;">
                <strong>Score:</strong> <span style="color:#059669">${site.successScore || site.suitabilityScore}/100</span><br/>
                <strong>Est. Rev:</strong> ₹${site.expectedRevenue?.toLocaleString('en-IN') || 'N/A'}<br/>
                <strong>Win Prob:</strong> ${site.successProbability || 'N/A'}%<br/>
                <strong>ML Conf:</strong> <span style="font-size:10px; background:#f3f4f6; padding:2px 4px; border-radius:4px;">${site.confidenceLevel || 'N/A'}</span>
            </div>
            <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid #e5e7eb;">
                <a href="https://www.google.com/maps/search/?api=1&query=${site.lat},${site.lng}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; gap: 4px; color: #2563eb; text-decoration: none; font-size: 12px; font-weight: 600;">
                    <svg style="width: 14px; height: 14px;" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    Open in Google Maps
                </a>
            </div>
        </div>
      `)
                .addTo(map);
            
            markersRef.current[site.id] = marker;

            // Open the popup for the #1 rank by default on initial load
            if (index === 0 && !selectedId) {
                marker.openPopup();
            }
        });
    }, [rankings, heatmapData]);

    // Handle selection changes
    useEffect(() => {
        if (!mapInstanceRef.current || !selectedId) return;

        const marker = markersRef.current[selectedId];
        if (marker) {
            const map = mapInstanceRef.current;
            map.setView(marker.getLatLng(), 14, { animate: true });
            marker.openPopup();
        }
    }, [selectedId]);

    // Track theme changes dynamically
    useEffect(() => {
        if (!mapInstanceRef.current) return;
        
        const map = mapInstanceRef.current;
        const isDark = resolvedTheme === "dark";
        const tileUrl = isDark 
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

        if (tileLayerRef.current) {
            map.removeLayer(tileLayerRef.current);
        }

        tileLayerRef.current = L.tileLayer(tileUrl, {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: "abcd",
            maxZoom: 19,
        }).addTo(map);
    }, [resolvedTheme]);

    return (
        <div className={`relative w-full overflow-hidden transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-[9999] h-[100dvh] bg-white' : 'h-full rounded-xl z-0'}`}>
            <div ref={mapContainerRef} className="h-full w-full" />

            {/* Fullscreen Toggle Button */}
            <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="absolute top-4 right-4 z-[1000] bg-white border border-gray-200 shadow-md p-2 rounded-lg hover:bg-gray-50 flex items-center justify-center transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "View Fullscreen"}
            >
                {isFullscreen ? (
                    <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l5-5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                )}
            </button>

            {/* Legend Overlay */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-2 rounded shadow text-xs z-1000 border border-gray-200">
                <div className="font-semibold mb-1">Legend</div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 rounded-full bg-blue-500 border border-white shadow-sm"></span>
                    <span>Recommended Site</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-gradient-to-r from-blue-400 via-yellow-400 to-red-500 rounded-sm"></div>
                    <span>Demand Heatmap</span>
                </div>
            </div>
        </div>
    );
}
