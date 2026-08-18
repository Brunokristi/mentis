<script setup>
import {
    computed,
    ref,
    watch
} from 'vue';

import BottomSheet from '../BottomSheet.vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },

    employee: {
        type: Object,
        default: null
    }
});

const emit = defineEmits([
    'update:modelValue'
]);

const bottomSheetRef = ref(null);

const isOpen = computed({
    get() {
        return props.modelValue;
    },

    set(value) {
        emit(
            'update:modelValue',
            value
        );
    }
});

const employeeName = computed(() => {
    return [
        props.employee?.titleBefore ??
            props.employee?.title_before,

        props.employee?.firstName ??
            props.employee?.first_name,

        props.employee?.lastName ??
            props.employee?.last_name,

        props.employee?.titleAfter ??
            props.employee?.title_after
    ]
        .filter(Boolean)
        .join(' ');
});

const employeeInitials = computed(() => {
    const firstName =
        props.employee?.firstName ??
        props.employee?.first_name ??
        '';

    const lastName =
        props.employee?.lastName ??
        props.employee?.last_name ??
        '';

    return [
        String(firstName).charAt(0),
        String(lastName).charAt(0)
    ]
        .filter(Boolean)
        .join('');
});

const employeePhotoUrl = computed(() => {
    return buildPublicAssetUrl(
        props.employee?.photoUrl ??
        props.employee?.photo_url ??
        null
    );
});

const employeePositions = computed(() => {
    const value =
        props.employee?.position ??
        props.employee?.positions ??
        '';

    if (Array.isArray(value)) {
        return value
            .map((position) => {
                if (
                    position &&
                    typeof position === 'object'
                ) {
                    return (
                        position.name ??
                        position.label ??
                        position.title ??
                        ''
                    );
                }

                return String(
                    position ??
                    ''
                );
            })
            .map((position) => {
                return position.trim();
            })
            .filter(Boolean);
    }

    return String(value)
        .split(/[\n,;]+/)
        .map((position) => {
            return position.trim();
        })
        .filter(Boolean);
});

const employeeBio = computed(() => {
    return (
        props.employee?.bio ??
        props.employee?.description ??
        ''
    );
});

watch(
    () => props.modelValue,
    (nextIsOpen) => {
        if (!nextIsOpen) {
            return;
        }

        window.requestAnimationFrame(() => {
            bottomSheetRef.value
                ?.forceOpen?.();

            bottomSheetRef.value
                ?.openSheet?.();
        });
    }
);

function buildPublicAssetUrl(path) {
    if (!path) {
        return null;
    }

    if (
        path.startsWith('http://') ||
        path.startsWith('https://')
    ) {
        return path;
    }

    const apiBaseUrl =
        import.meta.env
            .VITE_CLINVIA_API_URL ??
        'https://clinvia.studiokristian.com';

    const normalizedPath =
        path.startsWith('/')
            ? path
            : `/${path}`;

    return `${apiBaseUrl}${normalizedPath}`;
}
</script>

<template>
    <BottomSheet
        ref="bottomSheetRef"
        v-model="isOpen"
    >
        <div
            v-if="employee"
            class="
                mx-auto
                w-full
                max-w-5xl
                px-4
                pb-6
                pt-4
                space-y-10

                sm:px-6
                sm:pb-10
                sm:pt-6

                lg:px-0
                lg:pb-12
                lg:pt-8
            "
        >
            <!-- Image + name -->
            <div
                class="
                    flex
                    items-center
                    gap-4

                    sm:gap-5

                    lg:gap-6
                "
            >
                <!-- Portrait -->
                <div
                    class="
                        w-30
                        h-40
                        shrink-0
                        overflow-hidden
                        rounded-[20px]
                    "
                >
                    <img
                        v-if="employeePhotoUrl"
                        :src="employeePhotoUrl"
                        :alt="employeeName"
                        class="
                            h-full
                            w-full
                            object-cover
                            object-center
                        "
                    >

                    <div
                        v-else
                        class="
                            flex
                            h-full
                            w-full
                            items-center
                            justify-center
                            bg-green/10
                        "
                    >
                        <span
                            class="
                                font-heading
                                text-2xl
                                font-bold
                                text-green/30

                                sm:text-3xl

                                lg:text-4xl
                            "
                        >
                            {{ employeeInitials }}
                        </span>
                    </div>
                </div>

                <!-- Name -->
                <div
                    class="
                        min-w-0
                        flex
                        flex-col
                        gap-5
                    "
                >
                    <h2
                        class="
                            text-xl
                            font-bold
                            leading-[1.15]
                            text-green

                            sm:text-xl

                            lg:text-2xl
                        "
                    >
                        {{ employeeName }}
                    </h2>

                    <div
                        v-if="employeePositions.length"
                        class="
                            flex
                            flex-col
                            gap-2
                        "
                    >
                        <div
                            v-for="(
                                position,
                                index
                            ) in employeePositions"
                            :key="
                                `position-${index}-${position}`
                            "
                            class="
                                border-l-2
                                border-green
                                pl-3
                            "
                        >
                            <p
                                class="
                                    text-regular
                                    text-sm
                                    font-bold
                                    leading-5
                                    text-green

                                    sm:text-base
                                "
                            >
                                {{ position }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Positions -->


            <!-- Bio -->
            <p
                v-if="employeeBio"
                class="
                    mt-7
                    whitespace-pre-line
                    text-regular
                    leading-[1.75]
                    text-green/75

                "
            >
                {{ employeeBio }}
            </p>
        </div>
    </BottomSheet>
</template>