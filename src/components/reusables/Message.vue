<script>
import { watchEffect } from "vue";

import { useGlobalStore } from "../../stores/global";

export default {
  name: "Message",
  props: {
    type: {
      type: String,
      required: true,
    },
    messageBackgroundColor: String,
    messageBorderColor: String,
    messageIcon: String,
    closeIcon: String,
    hasMessageIcon: {
      type: Boolean,
      default: true,
    },
    life: {
      type: Number,
      default: 5000,
    },
  },
  setup(props) {
    const global = useGlobalStore();

    const types = {
      error: {
        backgroundColor: "var(--red-100)",
        borderColor: "var(--red-500)",
        icon: "las la-times-circle fs-2",
      },
      warning: {
        backgroundColor: "var(--yellow-100)",
        borderColor: "var(--yellow-500)",
        icon: "las la-exclamation-triangle fs-2",
      },
      info: {
        backgroundColor: "var(--teal-100)",
        borderColor: "var(--teal-500)",
        icon: "las la-info-circle fs-2",
      },
      success: {
        backgroundColor: "var(--green-100)",
        borderColor: "var(--gren-500)",
        icon: "las la-check fs-2",
      },
      primary: {
        backgroundColor: "var(--blue-100)",
        borderColor: "var(--blue-500)",
        icon: "las la-check fs-2",
      },
    };

    let timeout;

    const handleClick = (event) => {
      clearTimeout(timeout);
      global.setError({});
    };

    watchEffect(() => {
      clearTimeout(timeout);

      if (global.hasError) {
        timeout = setTimeout(() => {
          global.setError({});
        }, props.life);
      }
    });

    return {
      types,
      global,
      handleClick,
    };
  },
};
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div
      class="message"
      :style="{
        '--message-background-color': messageBackgroundColor
          ? messageBackgroundColor
          : types[type].backgroundColor,
        '--message-border-color': messageBorderColor
          ? messageBackgroundColor
          : types[type].borderColor,
      }"
      v-if="global.hasError"
    >
      <div class="message-content">
        <i
          class="message-content-icon"
          :class="messageIcon ? messageIcon : types[type].icon"
          v-show="hasMessageIcon"
        ></i>
        <p class="message-content-description">
          {{ global.getError.message }}
        </p>
      </div>
      <button type="button" @click="(event) => handleClick(event)">
        <i :class="closeIcon ? closeIcon : 'las la-times'"></i>
      </button>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.message {
  display: flex;
  justify-content: space-between;
  background-color: var(--message-background-color);
  padding: 1.25rem;
  border-radius: 4px;
  border: solid var(--message-border-color);
  border-width: 0 0 0 6px;
  margin: 0 0 1rem 0;

  &-content {
    display: flex;
    color: var(--message-border-color);

    &-description {
      margin: 0 1rem;
      align-self: center;
    }
  }
}

button {
  all: unset;
  cursor: pointer;
}
</style>
