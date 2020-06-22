<template>
    <div id="v-widget">
        <v-card >
            <v-toolbar :color="titleColor"
                       flat
                       dense
                       card
                       v-if="enableHeader">
                <v-toolbar-title>
                    <h4>
                        <v-icon left
                                v-if="enableIcon"
                                class="mr-1 ml-0">{{iconString}}</v-icon>
                        {{title}}
                    </h4>
                    <!-- <h4>{{title}}</h4> -->
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <slot name="widget-header-action"></slot>
            </v-toolbar>
            <v-divider v-if="enableHeader"></v-divider>
            <v-card-text :class="contentBg">
                <slot name="widget-content"></slot>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'v-widget',
    props: {
        title: {
            type: String,
        },
        enableHeader: {
            type: Boolean,
            default: true
        },
        contentBg: {
            type: String,
            default: 'white'
        },
        titleColor: {
            type: String,
            default: 'transparent'
        },
        enableIcon: {
            type: Boolean,
            default: false
        },
        iconString: {
            type: String,
            default: 'home'
        }
    },
    data () {
        return {

        };
    },
    computed: {

    },
};
</script>
