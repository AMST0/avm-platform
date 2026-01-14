import { prisma } from '@/lib/db';
import { Slider, SliderInput } from '@/lib/types';

function mapPrismaSliderToSlider(prismaSlider: any): Slider {
    return {
        id: prismaSlider.id,
        slug: prismaSlider.slug,
        title: {
            tr: prismaSlider.titleTr,
            en: prismaSlider.titleEn,
            ru: prismaSlider.titleRu,
            ar: prismaSlider.titleAr,
        },
        subtitle: prismaSlider.subtitleTr ? {
            tr: prismaSlider.subtitleTr,
            en: prismaSlider.subtitleEn,
            ru: prismaSlider.subtitleRu,
            ar: prismaSlider.subtitleAr,
        } : undefined,
        image: prismaSlider.image,
        mobileImage: prismaSlider.mobileImage || undefined,
        link: prismaSlider.link || undefined,
        order: prismaSlider.order,
        isActive: prismaSlider.isActive,
        createdAt: prismaSlider.createdAt,
        updatedAt: prismaSlider.updatedAt,
    };
}

export async function getSliders(): Promise<Slider[]> {
    console.log('[SliderRepository] Fetching active sliders...');
    const sliders = await prisma.slider.findMany({
        orderBy: { order: 'asc' },
    });
    console.log(`[SliderRepository] Found ${sliders.length} sliders in DB`);
    return sliders.map(mapPrismaSliderToSlider);
}

export async function getAllSliders(): Promise<Slider[]> {
    const sliders = await prisma.slider.findMany({
        orderBy: { order: 'asc' },
    });
    return sliders.map(mapPrismaSliderToSlider);
}

export async function getSliderById(id: string): Promise<Slider | null> {
    const slider = await prisma.slider.findUnique({
        where: { id },
    });
    if (!slider) return null;
    return mapPrismaSliderToSlider(slider);
}

export async function createSlider(data: SliderInput): Promise<Slider> {
    const slider = await prisma.slider.create({
        data: {
            slug: data.slug,
            titleTr: data.title.tr,
            titleEn: data.title.en,
            titleRu: data.title.ru,
            titleAr: data.title.ar,
            subtitleTr: data.subtitle?.tr,
            subtitleEn: data.subtitle?.en,
            subtitleRu: data.subtitle?.ru,
            subtitleAr: data.subtitle?.ar,
            image: data.image,
            mobileImage: data.mobileImage,
            link: data.link,
            order: data.order,
            isActive: data.isActive ?? true,
        },
    });
    return mapPrismaSliderToSlider(slider);
}

export async function updateSlider(id: string, data: Partial<SliderInput>): Promise<Slider> {
    const updateData: any = {};
    if (data.slug) updateData.slug = data.slug;
    if (data.image) updateData.image = data.image;
    if (data.mobileImage !== undefined) updateData.mobileImage = data.mobileImage;
    if (data.link !== undefined) updateData.link = data.link;
    if (data.order !== undefined) updateData.order = data.order;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    if (data.title) {
        if (data.title.tr) updateData.titleTr = data.title.tr;
        if (data.title.en) updateData.titleEn = data.title.en;
        if (data.title.ru) updateData.titleRu = data.title.ru;
        if (data.title.ar) updateData.titleAr = data.title.ar;
    }

    if (data.subtitle) {
        if (data.subtitle.tr) updateData.subtitleTr = data.subtitle.tr;
        if (data.subtitle.en) updateData.subtitleEn = data.subtitle.en;
        if (data.subtitle.ru) updateData.subtitleRu = data.subtitle.ru;
        if (data.subtitle.ar) updateData.subtitleAr = data.subtitle.ar;
    }

    const slider = await prisma.slider.update({
        where: { id },
        data: updateData,
    });
    return mapPrismaSliderToSlider(slider);
}

export async function deleteSlider(id: string): Promise<void> {
    await prisma.slider.delete({ where: { id } });
}

export async function updateSliderOrder(items: { id: string; order: number }[]): Promise<void> {
    // Transactional update for order
    await prisma.$transaction(
        items.map((item) =>
            prisma.slider.update({
                where: { id: item.id },
                data: { order: item.order },
            })
        )
    );
}
