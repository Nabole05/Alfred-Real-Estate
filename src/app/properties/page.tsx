import { PropertyCard } from "@/components/ui/property-card";

const mockProperties = [
    {
        id: "1",
        title: "Penthouse Palermo Hollywood",
        price: "$2,500,000",
        location: "Palermo, CABA",
        beds: 4,
        baths: 3,
        sqft: 280,
        status: "Disponible"
    },
    {
        id: "2",
        title: "Mansion Nordelta",
        price: "$3,800,000",
        location: "Nordelta, Buenos Aires",
        beds: 6,
        baths: 5,
        sqft: 450,
        status: "Reservada"
    },
    {
        id: "3",
        title: "Loft Puerto Madero",
        price: "$1,900,000",
        location: "Puerto Madero, CABA",
        beds: 2,
        baths: 2,
        sqft: 150,
        status: "Disponible"
    }
];

export default function PropertiesPage() {
    return (
        <div className="min-h-screen px-5 pt-8">
            <div className="max-w-md mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-white mb-1.5">
                        Propiedades
                    </h1>
                    <p className="text-zinc-500 text-xs">
                        {mockProperties.length} propiedades disponibles
                    </p>
                </div>

                <div className="space-y-4">
                    {mockProperties.map((property) => (
                        <PropertyCard
                            key={property.id}
                            title={property.title}
                            price={property.price}
                            location={property.location}
                            beds={property.beds}
                            baths={property.baths}
                            sqft={property.sqft}
                            status={property.status}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
