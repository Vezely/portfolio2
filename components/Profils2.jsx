import React from 'react';
import styles from '../styles/Profils2.module.css';
import Image from 'next/image';

const Profils2 = ({ technologies }) => {
	const tabIcon = [
		{
			nom: 'html',
			svg: `<svg width='46' height='46' viewBox='0 0 24 24'>
				<title>html</title>
				<path d='m3 1.5 1.638 18.9 7.351 2.1 7.37-2.102L21 1.5H3Zm14.438 6.188H8.813L9 10.078h8.25l-.633 7.096L12 18.491 7.374 17.18l-.317-3.632h2.262l.16 1.842 2.521.69 2.504-.699.262-3.007H6.937l-.59-7.012h11.287l-.197 2.324Z'></path>
				</svg>`,
		},
		{
			nom: 'css',
			svg: `<svg width='46' height='46' viewBox='0 0 24 24'>
				<title>css</title>
				<path d='m3 1.5 1.64 18.9 7.35 2.1 7.37-2.102L21 1.5H3Zm13.626 15.698-4.623 1.318-4.615-1.324-.316-3.645h2.262l.16 1.854 2.513.71.006.014 2.506-.696.264-3.007H9.516l-.188-2.344h5.656l.204-2.39H6.562L6.375 5.39h11.277l-1.026 11.807Z'></path>
				</svg>`,
		},

		{
			nom: 'sass',
			svg: `<svg width='46' height='46' viewBox='0 0 24 24'>
				<title>sass</title>
				<path d='M23.99 15.377c-.069-.558-.352-1.043-.844-1.442a.157.157 0 0 0-.02-.02l-.025-.018-.008-.006-.26-.188-.01-.006-.033-.024a.166.166 0 0 0-.039-.016c-.826-.492-2.193-.836-4.285-.098-.5-.84-.556-1.513-.222-2.544.06-.18.004-.299-.174-.375-.358-.153-.848-.075-1.196.017-.162.042-.26.134-.29.273-.22 1.031-.861 1.974-1.48 2.883l-.037.053c-.382-.809-.302-1.435-.037-2.22.053-.157.012-.261-.135-.339-.41-.211-1.024-.066-1.269.006-.31.09-.643.93-1.015 1.933a9.312 9.312 0 0 1-.222.57c-.115.234-.225.502-.341.785-.263.642-.559 1.364-.981 1.818-.154-.34.088-.876.323-1.396.278-.614.54-1.195.238-1.566a.554.554 0 0 0-.39-.202.621.621 0 0 0-.289.047c.031-.265.033-.474-.044-.727-.111-.36-.398-.562-.794-.552-.901.027-1.663.698-2.145 1.257-.32.375-1.03.66-1.655.911-.246.105-.48.199-.676.292-.312-.263-.708-.529-1.125-.81-1.172-.786-2.5-1.678-2.546-2.888C1.898 9 3.933 7.732 5.708 6.828c1.346-.685 2.516-1.138 3.577-1.386 1.491-.349 2.75-.278 3.742.208.543.266.797.844.636 1.438-.422 1.544-2.17 2.603-3.665 3.08-.9.286-1.667.406-2.344.367-.848-.05-1.541-.475-1.837-.657a.994.994 0 0 0-.15-.084l-.014-.003a.15.15 0 0 0-.15.047c-.06.072-.039.187-.017.245.288.753.884 1.23 1.77 1.415.29.058.584.086.88.083 2.072 0 4.716-1.194 5.687-2.178.663-.67 1.145-1.36 1.345-2.548.208-1.245-.635-2.11-1.495-2.508-2.09-.964-4.462-.583-6.085-.094C5.69 4.826 3.726 5.866 2.2 7.11.32 8.642-.36 10.063.18 11.34c.554 1.31 1.904 2.128 3.21 2.92.421.256.822.499 1.184.75l-.333.161c-1.096.531-2.34 1.129-3.029 2.117-.5.719-.594 1.435-.278 2.128.169.37.469.62.885.744.217.062.442.092.667.089.811 0 1.704-.328 2.19-.631.859-.54 1.415-1.263 1.654-2.151.213-.79.162-1.576-.147-2.277l1.052-.53c-.507 1.687-.118 2.695.31 3.25.157.206.44.329.758.335.317.005.61-.114.774-.318.313-.386.543-.839.756-1.291-.012.295.002.594.103.848.09.228.24.38.432.438.204.062.444.01.674-.148 1.04-.711 1.75-2.418 2.321-3.79.081-.195.16-.382.235-.558.14.506.337.994.585 1.457.056.1.051.144-.024.227-.113.123-.27.273-.437.431-.506.48-1.135 1.078-1.219 1.605-.033.21.112.403.338.447.678.135 1.495-.063 2.186-.528.628-.422.865-1.01.703-1.743-.156-.706.2-1.582 1.06-2.607.14.587.327 1.062.586 1.478l-.007.005c-.625.546-1.482 1.294-1.349 2.201a.626.626 0 0 0 .514.535c.09.017.183.015.273-.006.819-.172 1.435-.518 1.883-1.058.448-.54.285-1.138.134-1.602 1.171-.318 2.215-.31 3.192.024.548.187.941.495 1.168.92.286.535.132 1.029-.435 1.39-.174.111-.258.18-.263.265a.124.124 0 0 0 .047.104c.066.054.268.148.726-.14.422-.265.67-.625.733-1.078.012-.125.012-.25 0-.376ZM5.253 16.552l-.005.06c-.073.686-.422 1.284-1.038 1.781-.387.313-.808.504-1.184.54-.262.026-.453-.01-.567-.106-.084-.071-.13-.179-.14-.328-.077-1.194 1.796-2.381 2.85-2.771.076.267.104.546.084.824Zm4.797-3.368c-.173.988-.679 2.854-1.474 3.579-.038.034-.07.046-.084.043-.015-.003-.026-.02-.038-.047-.265-.615-.167-1.654.235-2.47.309-.629.75-1.045 1.243-1.171a.243.243 0 0 1 .063-.01.074.074 0 0 1 .046.013.078.078 0 0 1 .01.063Zm3.914 3.603c-.15.156-.354.135-.306.078l.761-.808c-.061.278-.243.508-.455.73Zm3.158-.699a.659.659 0 0 1-.231.066c-.022-.426.39-.904.797-1.223.109.443-.115.912-.566 1.157Z'></path>
			</svg>`,
		},
		{
			nom: 'javascript',
			svg: `<svg width='46' height='46' viewBox='0 0 24 24'>
				<title>javascript</title>
				<path d='M1.5 1.5v21h21v-21h-21Zm11.25 16.313c0 2.044-1.207 3.04-2.955 3.04-1.58 0-2.496-.817-2.96-1.804l1.606-.973c.31.55.545 1.015 1.222 1.015.562 0 1.024-.253 1.024-1.24V11.25h2.063v6.563Zm4.657 2.993c-1.832 0-3.016-.826-3.594-1.968l1.609-.932c.422.691.973 1.152 1.945 1.152.818 0 1.293-.362 1.293-.926 0-.677-.49-.916-1.392-1.313l-.493-.212c-1.424-.605-2.368-1.366-2.368-2.974 0-1.48 1.127-2.56 2.89-2.56 1.254 0 2.156.39 2.805 1.531l-1.54.99c-.338-.606-.703-.844-1.268-.844-.578 0-.945.367-.945.844 0 .592.367.831 1.213 1.198l.493.211c1.678.72 2.622 1.453 2.622 3.102 0 1.776-1.395 2.701-3.27 2.701Z'></path>
			</svg>`,
		},
		{
			nom: 'node.js',
			svg: `<svg width='46' height='46' viewBox='0 0 24 24'>
				<title>nodejs</title>
				<path d='m20.145 6.097-7.286-4.37a1.734 1.734 0 0 0-1.718 0l-7.286 4.37A1.79 1.79 0 0 0 3 7.633v8.727a1.794 1.794 0 0 0 .855 1.537l1.91 1.141.011.006c.965.494 1.334.494 1.762.494 1.507 0 2.443-.975 2.443-2.545V8.532a.399.399 0 0 0-.395-.403H8.537a.399.399 0 0 0-.394.403v8.461a.703.703 0 0 1-.321.613c-.277.168-.679.133-1.132-.101l-1.83-1.102a.052.052 0 0 1-.023-.043V7.756a.062.062 0 0 1 .027-.05l7.118-4.359a.039.039 0 0 1 .034 0l7.122 4.36a.063.063 0 0 1 .026.052v8.6a.062.062 0 0 1-.022.048l-7.127 4.249a.057.057 0 0 1-.038 0l-1.82-1.081a.365.365 0 0 0-.367-.02l-.016.01c-.503.298-.638.375-1.104.545-.075.027-.254.093-.27.27-.015.177.155.303.306.39l2.433 1.494c.259.155.555.238.857.238h.027c.295-.005.583-.087.836-.238l7.286-4.365a1.798 1.798 0 0 0 .855-1.54V7.634a1.79 1.79 0 0 0-.855-1.536Z'></path>
				<path d='M14.432 14.91c-1.748 0-2.12-.488-2.231-1.276a.395.395 0 0 0-.386-.343h-.928a.396.396 0 0 0-.387.402c0 .683.24 2.914 3.934 2.914 1.143 0 2.093-.267 2.748-.773.655-.506 1.006-1.242 1.006-2.118 0-1.76-1.149-2.243-3.41-2.558-2.3-.32-2.3-.482-2.3-.838 0-.257 0-.857 1.662-.857 1.183 0 1.816.15 2.019.938a.392.392 0 0 0 .378.312h.931a.386.386 0 0 0 .289-.134.417.417 0 0 0 .1-.302c-.121-1.666-1.34-2.511-3.715-2.511-2.16 0-3.448.972-3.448 2.601 0 1.786 1.336 2.291 3.342 2.5 2.344.242 2.344.596 2.344.908.001.487-.201 1.136-1.948 1.136Z'></path>
			</svg>`,
		},
		{
			nom: 'express.js',
			svg: `<svg x='0px' y='0px' width='100' height='100' viewBox='0 0 50 50'>
			<title>express.js</title>
				<path d='M49.729 11h-.85c-1.051 0-2.041.49-2.68 1.324l-8.7 11.377-8.7-11.377C28.162 11.49 27.171 11 26.121 11h-.85l10.971 14.346L25.036 40h.85c1.051 0 2.041-.49 2.679-1.324L37.5 26.992l8.935 11.684C47.073 39.51 48.063 40 49.114 40h.85L38.758 25.346 49.729 11zM21.289 34.242c-2.554 3.881-7.582 5.87-12.389 4.116C4.671 36.815 2 32.611 2 28.109L2 27h12v0h11l0-4.134c0-6.505-4.818-12.2-11.295-12.809C6.273 9.358 0 15.21 0 22.5l0 5.573c0 5.371 3.215 10.364 8.269 12.183 6.603 2.376 13.548-1.17 15.896-7.256 0 0 0 0 0 0h-.638C22.616 33 21.789 33.481 21.289 34.242zM2 22.5C2 16.71 6.71 12 12.5 12S23 16.71 23 22.5V25H2V22.5z'></path>
			</svg>`,
		},

		{
			nom: 'react.js',
			svg: `<svg width='46' height='46' viewBox='0 0 24 24'>
				<title>react.js</title>
				<path d='M19.25 8.471a16.35 16.35 0 0 0-.724-.228c.04-.165.077-.33.111-.495.549-2.668.19-4.816-1.034-5.524-1.172-.678-3.094.029-5.033 1.72-.19.167-.377.339-.56.516a10.989 10.989 0 0 0-.375-.345c-2.032-1.809-4.068-2.57-5.29-1.86-1.173.68-1.521 2.7-1.027 5.227.049.25.104.5.166.747-.288.082-.567.17-.833.262C2.27 9.323.75 10.628.75 11.981c0 1.398 1.633 2.8 4.114 3.65.201.067.405.131.61.19a13.96 13.96 0 0 0-.177.805c-.469 2.484-.103 4.456 1.066 5.132 1.208.698 3.235-.02 5.21-1.749.156-.137.313-.281.469-.433.197.19.4.376.61.555 1.912 1.65 3.8 2.316 4.968 1.638 1.207-.7 1.6-2.82 1.09-5.397-.04-.197-.084-.398-.135-.603.142-.042.282-.085.418-.13 2.578-.857 4.258-2.242 4.258-3.657-.001-1.36-1.571-2.672-4.001-3.51Zm-6.047-3.8c1.66-1.45 3.213-2.021 3.92-1.612.754.435 1.047 2.191.574 4.494-.031.15-.065.3-.101.449a22.866 22.866 0 0 0-3.009-.477 22.557 22.557 0 0 0-1.902-2.379c.168-.163.34-.321.517-.475Zm-5.81 8.466a28.373 28.373 0 0 0 1.345 2.325 20.406 20.406 0 0 1-2.074-.334 21.53 21.53 0 0 1 .73-1.991Zm0-2.266c-.28-.665-.519-1.32-.714-1.951a21.6 21.6 0 0 1 2.04-.35 27.81 27.81 0 0 0-1.327 2.301h.002Zm.512 1.133a27.347 27.347 0 0 1 2.048-3.558 27.226 27.226 0 0 1 4.101 0c.382.566.743 1.144 1.084 1.735.341.59.665 1.194.97 1.81-.301.62-.624 1.228-.967 1.825-.341.593-.7 1.175-1.079 1.745-.667.047-1.359.073-2.062.073-.703 0-1.381-.022-2.037-.065a27.26 27.26 0 0 1-2.06-3.565h.002Zm8.068 2.293c.226-.393.444-.792.652-1.195.286.648.538 1.31.756 1.984-.693.156-1.394.276-2.1.358.238-.377.469-.76.692-1.147Zm.643-3.425a31.326 31.326 0 0 0-.648-1.172c-.218-.38-.446-.757-.684-1.128.718.091 1.407.212 2.052.36a20.612 20.612 0 0 1-.72 1.94ZM12.01 5.835c.468.512.91 1.046 1.324 1.602a27.967 27.967 0 0 0-2.66 0 21.25 21.25 0 0 1 1.336-1.602ZM6.828 3.087C7.58 2.65 9.245 3.275 11 4.834c.112.1.225.205.337.313-.69.749-1.33 1.543-1.915 2.377-1.01.091-2.013.248-3.003.469-.057-.23-.109-.462-.155-.695-.424-2.167-.143-3.8.564-4.21ZM5.73 14.893a11.199 11.199 0 0 1-.555-.174c-1.097-.375-2.003-.865-2.625-1.397-.557-.478-.84-.955-.84-1.341 0-.82 1.223-1.868 3.26-2.578.256-.09.514-.17.774-.245.303.973.669 1.924 1.097 2.848a23.548 23.548 0 0 0-1.11 2.887Zm5.21 4.39c-.874.765-1.748 1.308-2.52 1.581-.692.245-1.244.252-1.577.06-.71-.41-1.005-1.994-.603-4.119.048-.25.103-.5.165-.75 1 .216 2.012.363 3.032.44a23.44 23.44 0 0 0 1.931 2.391c-.14.137-.283.27-.428.398Zm1.098-1.088a21.601 21.601 0 0 1-1.354-1.624 33.598 33.598 0 0 0 2.675-.004 20.6 20.6 0 0 1-1.322 1.628Zm5.836 1.34c-.134.724-.403 1.207-.736 1.4-.71.412-2.226-.123-3.861-1.534a15.464 15.464 0 0 1-.566-.515 22.714 22.714 0 0 0 1.886-2.4 22.375 22.375 0 0 0 3.047-.472c.046.186.086.368.122.546.225 1.14.257 2.17.108 2.975Zm.816-4.811c-.123.04-.25.08-.378.119a22.658 22.658 0 0 0-1.14-2.857c.428-.913.794-1.854 1.096-2.815.23.067.453.137.669.212 2.082.718 3.352 1.78 3.352 2.598 0 .872-1.372 2.003-3.599 2.743Z'></path>
				<path d='M12 13.992a2.016 2.016 0 1 0 .012-4.03 2.016 2.016 0 0 0-.013 4.03Z'></path>
			</svg>`,
		},
		{
			nom: 'next.js',
			svg: `<svg viewBox='0 -101.5 512 512' width='46' height='46' fill='#000000'>
				<title>nextjs</title>
				<g>
					<g>
						<path
							d='M120.81043,80.5613102 L217.378325,80.5613102 L217.378325,88.2366589 L129.662487,88.2366589 L129.662487,146.003758 L212.147564,146.003758 L212.147564,153.679106 L129.662487,153.679106 L129.662487,217.101725 L218.384241,217.101725 L218.384241,224.777073 L120.81043,224.777073 L120.81043,80.5613102 Z M226.0292,80.5613102 L236.289538,80.5613102 L281.756922,143.983929 L328.230222,80.5613102 L391.441486,0 L287.591232,150.649363 L341.105941,224.777073 L330.443237,224.777073 L281.756922,157.314798 L232.869425,224.777073 L222.407904,224.777073 L276.324978,150.649363 L226.0292,80.5613102 Z M344.928421,88.2366588 L344.928421,80.5613102 L454.975585,80.5613102 L454.975585,88.2366589 L404.27744,88.2366589 L404.27744,224.777073 L395.425382,224.777073 L395.425382,88.2366589 L344.928421,88.2366588 Z M1.42108547e-14,80.5613102 L11.0650714,80.5613102 L163.64593,308.884007 L100.591558,224.777073 L9.25442331,91.4683847 L8.85205708,224.777073 L1.42108547e-14,224.777073 L1.42108547e-14,80.5613102 Z M454.083705,214.785469 C452.275167,214.785469 450.918762,213.38418 450.918762,211.573285 C450.918762,209.762388 452.275167,208.361099 454.083705,208.361099 C455.913774,208.361099 457.248648,209.762388 457.248648,211.573285 C457.248648,213.38418 455.913774,214.785469 454.083705,214.785469 Z M462.781915,206.334618 L467.518563,206.334618 C467.583153,208.900055 469.456284,210.624719 472.212151,210.624719 C475.290972,210.624719 477.03492,208.770705 477.03492,205.29982 L477.03492,183.310363 L481.85769,183.310363 L481.85769,205.321379 C481.85769,211.573285 478.240613,215.173518 472.255212,215.173518 C466.635824,215.173518 462.781915,211.681076 462.781915,206.334618 Z M488.166045,206.054362 L492.945754,206.054362 C493.354828,209.007848 496.239878,210.883419 500.395211,210.883419 C504.270652,210.883419 507.11264,208.878498 507.11264,206.119036 C507.11264,203.747625 505.304102,202.324777 501.191828,201.354653 L497.187209,200.384531 C491.56782,199.069474 489.005723,196.353129 489.005723,191.782772 C489.005723,186.24229 493.527071,182.555823 500.30909,182.555823 C506.617445,182.555823 511.224912,186.24229 511.504805,191.480955 L506.811217,191.480955 C506.359083,188.613703 503.861576,186.824365 500.244499,186.824365 C496.43365,186.824365 493.893085,188.656819 493.893085,191.459398 C493.893085,193.679901 495.52938,194.95184 499.577063,195.900406 L503.000368,196.741178 C509.373314,198.228702 512,200.815695 512,205.493846 C512,211.443935 507.392533,215.173518 500.029197,215.173518 C493.139526,215.173518 488.51053,211.6164 488.166045,206.054362 Z'
							fillRule='nonzero'></path>
					</g>
				</g>
			</svg>`,
		},
		{
			nom: 'mysql',
			svg: `<svg  x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
			<path d="M 31.167969 8 C 30.699219 7.988281 30.289063 8.167969 30.078125 8.6875 C 29.71875 9.558594 30.613281 10.410156 30.933594 10.855469 C 31.15625 11.164063 31.445313 11.511719 31.605469 11.859375 C 31.710938 12.089844 31.726563 12.320313 31.816406 12.5625 C 32.039063 13.160156 32.394531 13.839844 32.679688 14.394531 C 32.824219 14.675781 32.984375 14.96875 33.167969 15.21875 C 33.28125 15.371094 33.472656 15.441406 33.503906 15.675781 C 33.316406 15.941406 33.304688 16.351563 33.199219 16.6875 C 32.722656 18.191406 32.902344 20.0625 33.59375 21.171875 C 33.808594 21.515625 34.3125 22.246094 35 21.96875 C 35.601563 21.722656 35.46875 20.960938 35.640625 20.285156 C 35.679688 20.136719 35.65625 20.023438 35.734375 19.921875 L 35.734375 19.953125 C 35.914063 20.320313 36.097656 20.6875 36.28125 21.050781 C 36.691406 21.707031 37.414063 22.390625 38.023438 22.855469 C 38.339844 23.09375 38.589844 23.507813 39 23.648438 L 39 23.617188 L 38.96875 23.617188 C 38.890625 23.492188 38.765625 23.441406 38.664063 23.34375 C 38.425781 23.109375 38.160156 22.816406 37.964844 22.546875 C 37.40625 21.792969 36.914063 20.964844 36.46875 20.105469 C 36.253906 19.695313 36.066406 19.242188 35.886719 18.824219 C 35.816406 18.660156 35.816406 18.417969 35.671875 18.332031 C 35.472656 18.640625 35.183594 18.886719 35.03125 19.25 C 34.789063 19.828125 34.753906 20.535156 34.664063 21.265625 C 34.609375 21.285156 34.632813 21.269531 34.605469 21.296875 C 34.179688 21.191406 34.027344 20.753906 33.871094 20.378906 C 33.472656 19.429688 33.394531 17.898438 33.75 16.808594 C 33.839844 16.523438 34.25 15.632813 34.085938 15.371094 C 34.007813 15.109375 33.742188 14.960938 33.597656 14.761719 C 33.414063 14.515625 33.234375 14.191406 33.109375 13.90625 C 32.78125 13.164063 32.472656 12.304688 32.125 11.554688 C 31.960938 11.195313 31.683594 10.835938 31.453125 10.515625 C 31.199219 10.164063 30.917969 9.90625 30.71875 9.476563 C 30.652344 9.328125 30.554688 9.085938 30.660156 8.929688 C 30.691406 8.824219 30.738281 8.78125 30.84375 8.746094 C 31.019531 8.609375 31.511719 8.789063 31.699219 8.867188 C 32.1875 9.070313 32.597656 9.265625 33.011719 9.539063 C 33.210938 9.671875 33.410156 9.925781 33.652344 10 L 33.925781 10 C 34.359375 10.097656 34.839844 10.027344 35.238281 10.152344 C 35.949219 10.367188 36.585938 10.703125 37.160156 11.066406 C 38.921875 12.175781 40.363281 13.757813 41.34375 15.644531 C 41.503906 15.949219 41.574219 16.242188 41.714844 16.5625 C 41.992188 17.210938 42.347656 17.882813 42.628906 18.515625 C 42.90625 19.152344 43.179688 19.789063 43.574219 20.316406 C 43.78125 20.59375 44.585938 20.746094 44.949219 20.898438 C 45.203125 21.007813 45.625 21.121094 45.863281 21.265625 C 46.328125 21.542969 46.773438 21.875 47.207031 22.183594 C 47.425781 22.335938 48.089844 22.667969 48.125 22.945313 C 47.050781 22.917969 46.230469 23.015625 45.53125 23.3125 C 45.332031 23.398438 45.011719 23.398438 44.980469 23.648438 C 45.085938 23.761719 45.105469 23.933594 45.191406 24.074219 C 45.359375 24.34375 45.640625 24.707031 45.894531 24.898438 C 46.171875 25.105469 46.453125 25.328125 46.75 25.511719 C 47.273438 25.828125 47.859375 26.011719 48.367188 26.332031 C 48.664063 26.523438 48.964844 26.761719 49.253906 26.972656 C 49.398438 27.082031 49.492188 27.246094 49.679688 27.3125 L 49.679688 27.28125 C 49.582031 27.15625 49.558594 26.984375 49.46875 26.855469 L 49.066406 26.453125 C 48.679688 25.941406 48.1875 25.488281 47.664063 25.113281 C 47.246094 24.8125 46.3125 24.40625 46.140625 23.921875 L 46.109375 23.890625 C 46.402344 23.859375 46.75 23.75 47.023438 23.675781 C 47.484375 23.554688 47.890625 23.585938 48.363281 23.464844 C 48.578125 23.402344 48.792969 23.339844 49.007813 23.28125 L 49.007813 23.15625 C 48.769531 22.914063 48.597656 22.585938 48.335938 22.363281 C 47.652344 21.78125 46.90625 21.199219 46.136719 20.714844 C 45.710938 20.445313 45.183594 20.269531 44.734375 20.042969 C 44.582031 19.964844 44.316406 19.925781 44.214844 19.796875 C 43.976563 19.496094 43.847656 19.113281 43.664063 18.761719 C 43.28125 18.023438 42.90625 17.21875 42.566406 16.441406 C 42.335938 15.914063 42.183594 15.390625 41.894531 14.914063 C 40.507813 12.636719 39.015625 11.257813 36.703125 9.90625 C 36.210938 9.617188 35.621094 9.507813 34.996094 9.359375 C 34.65625 9.335938 34.324219 9.316406 33.984375 9.296875 C 33.78125 9.210938 33.566406 8.960938 33.375 8.835938 C 32.894531 8.535156 31.949219 8.011719 31.167969 8 Z M 34.476563 11.3125 C 34.253906 11.308594 34.09375 11.339844 33.925781 11.375 L 33.925781 11.40625 L 33.957031 11.40625 C 34.0625 11.625 34.253906 11.765625 34.386719 11.953125 C 34.488281 12.167969 34.585938 12.382813 34.6875 12.597656 L 34.71875 12.566406 C 34.90625 12.433594 34.996094 12.21875 34.996094 11.894531 C 34.917969 11.816406 34.90625 11.714844 34.84375 11.621094 C 34.753906 11.492188 34.585938 11.421875 34.476563 11.3125 Z M 1.867188 23.996094 C 1.566406 24.007813 1.238281 24.066406 0.882813 24.179688 C 0.289063 24.359375 -0.00390625 24.714844 -0.00390625 25.4375 L -0.00390625 33 L 2 33 L 2 25.621094 L 4.777344 31.929688 C 5.121094 32.714844 5.589844 32.996094 6.507813 32.996094 C 7.429688 32.996094 7.878906 32.714844 8.222656 31.929688 L 11 25.78125 L 11 33 L 13 33 L 13 25.4375 C 13 24.714844 12.710938 24.359375 12.113281 24.179688 C 10.691406 23.730469 9.734375 24.117188 9.304688 25.089844 L 6.453125 31.503906 L 3.695313 25.089844 C 3.382813 24.359375 2.757813 23.960938 1.867188 23.996094 Z M 26.246094 24 C 25.457031 24 23 24.09375 23 26 L 23 27.234375 C 23 28.109375 23.769531 28.824219 25.4375 29 C 25.625 29.011719 25.8125 29.027344 26 29.027344 C 26 29.027344 27.945313 28.988281 28 29 C 29.125 29 29 29.875 29 30 L 29 31 C 29 31.136719 28.96875 32 27.988281 32 L 23 32 L 23 33 L 28.007813 33 C 28.664063 33 29.300781 32.863281 29.808594 32.625 C 30.652344 32.238281 31 31.714844 31 31.027344 L 31 29.597656 C 31 28.0625 29.09375 28 28 28 L 26 28 C 25.214844 28 25.09375 27.523438 25 27 L 25 26 C 25.09375 25.601563 25.269531 25.0625 25.964844 25 L 31 25 L 31 24 Z M 33.980469 24 C 32.503906 24.203125 31.984375 24.9375 31.984375 26 L 31.984375 31 C 31.984375 31.972656 32.527344 32.558594 33.644531 32.863281 C 34.019531 32.96875 34.359375 33.011719 34.679688 33.011719 L 36.90625 33 L 38.214844 33 L 39.328125 34 L 41.578125 34 L 40.03125 32.605469 C 40.757813 32.304688 40.984375 31.84375 40.984375 30.980469 L 40.984375 26 C 40.984375 24.9375 40.292969 24.203125 38.816406 24 Z M 42 24 L 42 30.957031 C 42 32.164063 42.683594 32.84375 44.492188 32.980469 C 44.660156 32.988281 44.832031 33 45 33 L 50 33 L 50 32 L 45.378906 32 C 44.347656 32 44 31.566406 44 30.949219 L 44 24 Z M 35.171875 25 L 37.746094 25 C 38.425781 25 38.882813 25.546875 38.984375 26 C 38.984375 26 39 30.65625 39 31 C 39 31.34375 38.808594 31.5 38.808594 31.5 L 38.265625 31 L 36 31 L 37.113281 32 L 35.171875 32 C 34.476563 32 34.085938 31.484375 33.984375 31 L 33.984375 26.101563 C 33.984375 25.570313 34.390625 25 35.171875 25 Z M 14 27 C 14.039063 27.039063 14 31.261719 14 31.34375 C 14.015625 32.21875 15.125 32.984375 16.863281 33 L 20 33 L 20 33.066406 C 20 33.253906 20.136719 33.878906 19 34 C 18.988281 34 14.011719 34 14 34 L 14 35 L 19.214844 35 C 20.097656 34.972656 22.011719 34.773438 22 33.242188 C 22 33.214844 22.007813 27 22 27 L 20 27 L 20 32 C 19.96875 32 17.523438 32.007813 17.03125 32 C 16.066406 31.984375 15.984375 31.433594 16 31.222656 L 16 27 Z"></path>
			</svg>`,
		},
		{
			nom: 'vue.js',
			svg: `<svg width='46' height='46' viewBox='0 0 24 24'>
				<title>vuejs</title>
				<path d='M12 6.755 9.4 2.25H5.675L12 13.204 18.325 2.25H14.6L12 6.755Z'></path>
				<path d='m19.191 2.25-7.19 12.454L4.81 2.25H.738l11.263 19.508L23.263 2.25H19.19Z'></path>
			</svg>`,
		},
		{
			nom: 'wordpress',
			svg: `<svg width='46' height='46' viewBox='0 0 24 24'>
				<title>wordpress</title>
				<path d='m12.141 12.719-1.537 4.486h-.005l-1.19 3.426c.084.024.163.042.248.066h.014a9.03 9.03 0 0 0 2.32.305c.39.003.781-.026 1.167-.085a8.642 8.642 0 0 0 1.89-.455c-.132-.28-.413-.904-.427-.932l-2.48-6.811Z'></path>
				<path d='M3.788 8.46C3.317 9.52 3 10.824 3 12c0 .295.014.59.042.881.324 3.338 2.48 6.14 5.442 7.402.122.051.249.103.375.15L4.5 8.466c-.375-.014-.445.009-.712-.005Z'></path>
				<path d='M20.166 8.222a8.816 8.816 0 0 0-.708-1.247c-.075-.112-.16-.225-.24-.337a9.048 9.048 0 0 0-3.979-3.029A8.869 8.869 0 0 0 11.995 3a8.977 8.977 0 0 0-7.003 3.361 9.187 9.187 0 0 0-.82 1.2c.666.005 1.49.005 1.584.005.849 0 2.156-.103 2.156-.103.441-.029.488.614.052.665 0 0-.44.052-.928.075l2.948 8.766 1.772-5.311-1.256-3.45c-.44-.024-.848-.075-.848-.075-.441-.024-.385-.694.046-.666 0 0 1.336.103 2.133.103.849 0 2.157-.103 2.157-.103.435-.028.492.614.051.666 0 0-.436.051-.923.075l2.92 8.7.81-2.7c.409-1.05.615-1.917.615-2.611 0-.998-.361-1.692-.67-2.231-.408-.67-.793-1.233-.793-1.894 0-.745.563-1.44 1.36-1.44h.103C18.689 6 19.092 7.22 19.144 8.049v.029c.019.337.004.586.004.88 0 .816-.154 1.74-.614 2.898l-1.828 5.287-1.045 3.08a5.92 5.92 0 0 0 .248-.117c2.658-1.285 4.594-3.844 5.002-6.877.06-.403.09-.81.089-1.219a8.957 8.957 0 0 0-.834-3.787Z'></path>
				<path d='M12 2.25a9.753 9.753 0 0 1 3.797 18.734A9.753 9.753 0 0 1 8.203 3.016 9.689 9.689 0 0 1 12 2.25Zm0-.75C6.201 1.5 1.5 6.201 1.5 12S6.201 22.5 12 22.5 22.5 17.799 22.5 12 17.799 1.5 12 1.5Z'></path>
			</svg>`,
		},
	];
	const technologiesSet = new Set(technologies.map((tech) => tech.nom.toLowerCase()));

	return (
		<div className={styles.contenu}>
			<div className={styles.container}>
				{tabIcon.map((icon, index) => (
					<div
						className={`${styles.boxImage} ${technologiesSet.has(icon.nom.toLowerCase()) ? styles.contient : ''}`}
						key={index}
						dangerouslySetInnerHTML={{ __html: `${icon.svg}` }}
					/>
				))}
			</div>
		</div>
	);
};

export default Profils2;